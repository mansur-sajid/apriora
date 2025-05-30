import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import {InputAdornment} from "@mui/material";

import {
  useCreateJobPostMutation,
  IJobPostPayTypeEnum,
  IJobPostStatusEnum,
  IWorkModeEnum,
  IAvailabilityEnum,
  IEmploymentTypeEnum,
  toGlobalId,
} from "@apriora/titan/gql-client";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

// Zod schemas
const step1Schema = z.object({
  title: z.string().min(1, "Title is required"),
  department: z.string().min(1, "Department is required"),
  description: z.string().min(1, "Description is required"),
  minSalary: z.coerce.number().min(1, "Minimum salary must be greater than 0"),
  maxSalary: z.coerce.number().min(1, "Maximum salary must be greater than 0"),
});

const step2Schema = z.object({
  city: z.string().min(1, "City is required"),
  availability: z.nativeEnum(IAvailabilityEnum),
  workMode: z.nativeEnum(IWorkModeEnum),
  employmentType: z.nativeEnum(IEmploymentTypeEnum),
});

const step3Schema = z.object({
  applicationLimit: z.coerce
    .number()
    .int("Application limit must be an integer")
    .min(1, "Application limit is required"),
  workStartDate: z.string().min(1, "Work start date is required"),
  expiresAt: z.coerce.date({
    required_error: "Please select an end date",
    invalid_type_error: "Please enter a valid date",
  }),
});

const step4Schema = z.object({
  questions: z
    .array(z.string().min(1, "Question is required"))
    .min(1, "At least one question is required"),
});

const fullSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);
type FullForm = z.infer<typeof fullSchema>;

const steps = [
  "Basic Info",
  "Employment Details",
  "Important Dates",
  "Questions",
];

// Helper function to encode salary range
const encodeSalaryRange = (min: number, max: number): number => {
  const minStr = min.toString();
  const maxStr = max.toString();
  const encoded = `${minStr.length}${maxStr.length}${minStr}${maxStr}`;
  return parseInt(encoded, 10);
};

const MultiStepFormModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(0);
  const queryClient = useQueryClient();
  const { mutateAsync: createJobPost } = useCreateJobPostMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["JobsPosts"],
      });
    },
  });

  const methods = useForm<FullForm>({
    resolver: zodResolver(fullSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      department: "",
      description: "",
      city: "",
      minSalary: 0,
      maxSalary: 0,
      availability: IAvailabilityEnum.Immediate,
      workMode: IWorkModeEnum.OnSite,
      employmentType: IEmploymentTypeEnum.FullTime,
      applicationLimit: 0,
      workStartDate: "",
      expiresAt: null,
      questions: [],
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  const nextStep = async () => {
    let valid = false;
    if (step === 0)
      valid = await trigger([
        "title",
        "department",
        "description",
        "minSalary",
        "maxSalary",
      ]);
    if (step === 1)
      valid = await trigger(["city", "workMode", "employmentType"]);
    if (step === 2)
      valid = await trigger(["applicationLimit", "workStartDate", "expiresAt"]);

    if (step === 3) valid = await trigger(["questions"]);

    if (valid) setStep((s) => s + 1);
  };

  const { fields, append, remove } = useFieldArray({
    //@ts-expect-error dedefined in the schema
    name: "questions",
    control: methods.control,
  });

  const previousStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: FullForm) => {
    try {
      const encodedSalary = encodeSalaryRange(data.minSalary, data.maxSalary);

      await createJobPost({
        data: {
          title: data.title,
          payType: IJobPostPayTypeEnum.Unit,
          department: data.department,
          description: data.description,
          city: data.city,
          companyId: toGlobalId(
            "CompanyType",
            "42fe9ce9-ccf9-4197-8ea2-aff660ab3968"
          ), // Replace with actual company ID
          availibility: data.availability,
          workMode: data.workMode,
          employmentType: data.employmentType,
          applicationLimit: parseInt(data.applicationLimit.toString(), 10),
          workStartDate: data.workStartDate,
          startDate: data.workStartDate,
          expiresAt: data.expiresAt,
          questions: data.questions,
          endDate: data.expiresAt,
          country: "",
          minSalary: parseInt(data.minSalary.toString(), 10),
          maxSalary: parseInt(data.maxSalary.toString(), 10),
          status: IJobPostStatusEnum.Draft,
        },
      });

      methods.reset();
      setStep(0);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Create Job Posting</DialogTitle>

        <DialogContent dividers>
          <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {step === 0 && (
              <>
                <TextField
                  fullWidth
                  label="Title"
                  {...register("title")}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Client Name"
                  {...register("department")}
                  error={!!errors.department}
                  helperText={errors.department?.message}
                  margin="normal"
                />

                <Box marginY={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Salary Range
                  </Typography>
                  <Box display="flex" gap={2} alignItems="center">
                    <TextField
                      fullWidth
                      label="From"
                      type="number"
                      {...register("minSalary")}
                      error={!!errors.minSalary}
                      helperText={errors.minSalary?.message}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                    <Typography variant="body1">to</Typography>
                    <TextField
                      fullWidth
                      label="To"
                      type="number"
                      {...register("maxSalary")}
                      error={!!errors.maxSalary}
                      helperText={errors.maxSalary?.message}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>

                <Box marginY={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Description
                  </Typography>
                  <Box
                    sx={{
                      "& .ql-container": {
                        minHeight: "200px",
                        fontSize: "16px",
                        fontFamily:
                          '"Roboto", "Helvetica", "Arial", sans-serif',
                      },
                      "& .ql-editor": {
                        minHeight: "200px",
                        "& a": {
                          color: "#1976d2",
                          textDecoration: "underline",
                          "&:hover": {
                            textDecoration: "none",
                          },
                        },
                        "&.ql-blank::before": {
                          color: "rgba(0, 0, 0, 0.6)",
                          fontStyle: "normal",
                          left: "12px",
                        },
                      },
                      "& .ql-toolbar": {
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                        borderColor: "rgba(0, 0, 0, 0.23)",
                      },
                      "& .ql-container.ql-snow": {
                        borderBottomLeftRadius: "4px",
                        borderBottomRightRadius: "4px",
                        borderColor: "rgba(0, 0, 0, 0.23)",
                      },
                      "&:hover .ql-toolbar, &:hover .ql-container.ql-snow": {
                        borderColor: "rgba(0, 0, 0, 0.87)",
                      },
                      "& .ql-snow .ql-picker-label:hover, & .ql-snow .ql-picker-label.ql-active":
                        {
                          color: "#1976d2",
                        },
                      "& .ql-snow .ql-stroke": {
                        stroke: "rgba(0, 0, 0, 0.87)",
                      },
                      "& .ql-snow .ql-fill": {
                        fill: "rgba(0, 0, 0, 0.87)",
                      },
                      "& .ql-snow.ql-toolbar button:hover, & .ql-snow.ql-toolbar button:focus":
                        {
                          color: "#1976d2",
                          "& .ql-stroke": {
                            stroke: "#1976d2",
                          },
                          "& .ql-fill": {
                            fill: "#1976d2",
                          },
                          "& .ql-tooltip": {
                            left: "0 !important", // Force tooltip to stay within container
                            maxWidth: "100%",
                          },
                          "& .ql-editing": {
                            left: "0 !important",
                            whiteSpace: "nowrap",
                          },
                          '& .ql-tooltip input[type="text"]': {
                            width: "100%",
                            maxWidth: "200px", // Adjust as needed
                          },
                        },
                    }}
                  >
                    <ReactQuill
                      value={methods.watch("description")}
                      onChange={(value) =>
                        methods.setValue("description", value)
                      }
                      theme="snow"
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, false] }],
                          ["bold", "italic", "underline", "strike"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link"],
                          ["clean"],
                        ],
                        clipboard: {
                          matchVisual: false, // Prevents odd styling issues when pasting
                        },
                      }}
                      formats={[
                        "header",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "list",
                        "bullet",
                        "link",
                      ]}
                      placeholder="Enter job description..."
                    />
                  </Box>
                  {errors.description && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      {errors.description.message}
                    </Typography>
                  )}
                </Box>
              </>
            )}

            {/* Rest of the form steps remain the same */}
            {step === 1 && (
              <>
                <TextField
                  fullWidth
                  label="City"
                  {...register("city")}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  margin="normal"
                />

                <TextField
                  select
                  fullWidth
                  label="Availability"
                  {...register("availability")}
                  error={!!errors.availability}
                  helperText={errors.availability?.message}
                  margin="normal"
                >
                  <MenuItem value="IMMEDIATE">Immediate</MenuItem>
                  <MenuItem value="TWO_WEEKS_NOTICE">2 weeks notice</MenuItem>
                  <MenuItem value="THREE_WEEKS_NOTICE">3 weeks notice</MenuItem>
                  <MenuItem value="FOUR_WEEKS_NOTICE">4 weeks notice</MenuItem>
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Work Mode"
                  {...register("workMode")}
                  error={!!errors.workMode}
                  helperText={errors.workMode?.message}
                  margin="normal"
                >
                  <MenuItem value="ON_SITE">On-site</MenuItem>
                  <MenuItem value="REMOTE">Remote</MenuItem>
                  <MenuItem value="HYBRID">Hybrid</MenuItem>
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Employment Type"
                  {...register("employmentType")}
                  error={!!errors.employmentType}
                  helperText={errors.employmentType?.message}
                  margin="normal"
                >
                  <MenuItem value="FULL_TIME">Full-time</MenuItem>
                  <MenuItem value="PART_TIME">Part-time</MenuItem>
                  <MenuItem value="CONTRACT">Contract</MenuItem>
                </TextField>
              </>
            )}

            {step === 2 && (
              <>
                <TextField
                  fullWidth
                  label="Application Limit"
                  type="number"
                  {...register("applicationLimit")}
                  error={!!errors.applicationLimit}
                  helperText={errors.applicationLimit?.message}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Work Start Date"
                  type="date"
                  {...register("workStartDate")}
                  error={!!errors.workStartDate}
                  helperText={errors.workStartDate?.message}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  {...register("expiresAt")}
                  error={!!errors.expiresAt}
                  helperText={errors.expiresAt?.message}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </>
            )}

            {step === 3 && (
              <>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Add Custom Questions
                </Typography>

                {fields.map((field, index) => (
                  <TextField
                    key={field.id}
                    fullWidth
                    label={`Question ${index + 1}`}
                    {...register(`questions.${index}` as const)}
                    error={!!errors.questions?.[index]}
                    helperText={errors.questions?.[index]?.message}
                    margin="normal"
                  />
                ))}

                <Box display="flex" gap={2} mt={2}>
                  <Button variant="outlined" onClick={() => append("")}>
                    Add Question
                  </Button>
                  {fields.length > 1 && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => remove(fields.length - 1)}
                    >
                      Remove Last
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              methods.reset(); // Reset form to default values
              setStep(0);
              onClose(); // Close the modal
            }}
            variant="text"
            color="inherit"
          >
            Cancel
          </Button>

          {step > 0 && (
            <Button onClick={previousStep} variant="outlined">
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button onClick={nextStep} variant="contained">
              Next
            </Button>
          ) : (
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default MultiStepFormModal;
