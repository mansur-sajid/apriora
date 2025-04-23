import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQueryClient } from '@tanstack/react-query';

import { useCreateJobPostMutation, IJobPostPayTypeEnum, IJobPostStatusEnum, IWorkModeEnum, IAvailabilityEnum, IEmploymentTypeEnum, toGlobalId } from "@apriora/titan/gql-client";
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
  salary: z.coerce.number().min(1, "Salary must be greater than 0"),
});

const step2Schema = z.object({
  city: z.string().min(1, "City is required"),
  availability: z.nativeEnum(IAvailabilityEnum),
  workMode: z.nativeEnum(IWorkModeEnum),
  employmentType: z.nativeEnum(IEmploymentTypeEnum),
});

const step3Schema = z.object({
  applicationLimit: z.coerce.number().int("Application limit must be an integer").min(1, "Application limit is required"),
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

const MultiStepFormModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(0);
  const queryClient = useQueryClient();
  const {mutateAsync: createJobPost} = useCreateJobPostMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['JobsPosts'] 
      });
    }

  });
  

  const methods = useForm<FullForm>({
    resolver: zodResolver(fullSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      department: "",
      description: "",
      city: "",
      salary: 0,
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
      valid = await trigger(["title", "department", "description", "salary"]);
    if (step === 1)
      valid = await trigger(["city", "workMode", "employmentType"]);
    if (step === 2)
      valid = await trigger([
        "applicationLimit",
        "workStartDate",
        "expiresAt",
      ]);

    if (step === 3) valid = await trigger(["questions"]);

    if (valid) setStep((s) => s + 1);
  };
  
  
  const { fields, append, remove } = useFieldArray({
    // @ts-expect-error – we know this is okay for now
    name: "questions",
    control: methods.control,
  });

  const previousStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: FullForm) => {
    try {
      console.log("Submitted:", data);
      
      await createJobPost({
        data: {
          title: data.title,
          payType: IJobPostPayTypeEnum.Unit,
          department: data.department,
          description: data.description,
          city: data.city,
          companyId: toGlobalId("CompanyType", "42fe9ce9-ccf9-4197-8ea2-aff660ab3968"), // Replace with actual company ID
          availibility: data.availability,
          workMode: data.workMode,
          employmentType: data.employmentType,
          applicationLimit: parseInt(data.applicationLimit.toString(), 10),
          workStartDate: data.workStartDate,
          startDate: data.workStartDate,
          expiresAt: data.expiresAt,
          questions: data.questions, // This will now have the proper values
          endDate: data.expiresAt,
          country: "",
          salary: parseInt(data.salary.toString(), 10),
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
                  label="Department"
                  {...register("department")}
                  error={!!errors.department}
                  helperText={errors.department?.message}
                  margin="normal"
                />
                <TextField
  fullWidth
  label="Salary"
  {...register("salary")}
  error={!!errors.salary}
  helperText={errors.salary?.message}
  margin="normal"
/>
                <TextField
                  fullWidth
                  label="Description"
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  margin="normal"
                  multiline
                  rows={4}
                />
              </>
            )}

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
      onClose();       // Close the modal
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
