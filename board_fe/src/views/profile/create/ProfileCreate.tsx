import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ProtectedRoute } from "../../../layout/ProtectedRoute";
import Layout from "../../../layout/Layout";
import { IProfile } from "../../../types/IProfile";
import Input from "../../../components/Input/Input";
import TextArea from "../../../components/Input/TextArea";
import Button from "../../../components/Button/Button";
import { useProfileCreate } from "./useProfileCreate";

const ProfileCreate = () => {
  const { createProfileAsync } = useProfileCreate();
  const { control, register, handleSubmit } = useForm<IProfile>({
    defaultValues: {
      companies: [{}],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "companies",
  });
  const onSubmit = (data) => {
    console.log(data);
    createProfileAsync(data);
  };
  return (
    <ProtectedRoute>
      <Layout>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold mb-4">Create profile!</p>
            <button className="font-bold hover:cursor-pointer" type="submit">
              Save
            </button>
          </div>
          <div className="md:flex flex-row gap-8">
            <div className="w-full rounded-lg p-4 bg-white h-fit">
              <p className="text-lg font-bold mb-4">User information</p>
              <label>Name *</label>
              <Input {...register("name", { required: true })} />
              <div className="h-4" />

              <label>Title *</label>
              <Input {...register("title", { required: true })} />
              <div className="h-4" />

              <label>Email *</label>
              <Input {...register("email", { required: true })} type="email" />
              <div className="h-4" />

              <label>Phone *</label>
              <Input {...register("phone", { required: true })} />
              <div className="h-4" />

              <label>Bio *</label>
              <TextArea {...register("bio", { required: true })} />
              <div className="h-4" />

              <label>Location *</label>
              <Input {...register("location", { required: true })} />
              <div className="h-4" />

              <label>Linkedin URL *</label>
              <Input {...register("linkedinUrl", { required: true })} />
              <div className="h-4" />

              <p className="text-lg font-bold mb-2">Education Details</p>

              <label>University Name *</label>
              <Input
                {...register("education.universityName", { required: true })}
              />
              <div className="h-4" />

              <label>Degree *</label>
              <Input {...register("education.degree", { required: true })} />
              <div className="h-4" />

              <label>Start Date *</label>
              <Input {...register("education.startDate", { required: true })} />
              <div className="h-4" />

              <label>End Date *</label>
              <Input {...register("education.endDate", { required: true })} />
              <div className="h-4" />
            </div>

            <div className="w-full bg-white rounded-lg p-4 h-fit">
              <div className="flex justify-between my-2">
                <p className="text-lg font-bold ">Company details</p>

                <Button onClick={() => append({})}>Add a new position</Button>
              </div>
              <div>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 border rounded-lg border-slate-400 mb-4"
                  >
                    <label>Company name *</label>
                    <Input
                      {...register(`companies.${index}.companyName`, {
                        required: true,
                      })}
                    />
                    <div className="h-4" />

                    <label>Company description *</label>
                    <TextArea
                      {...register(`companies.${index}.companyDescription`, {
                        required: true,
                      })}
                    />
                    <div className="h-4" />

                    <div className="flex gap-4 items-center space-arround">
                      <div>
                        <label>Start date *</label>
                        <Input
                          {...register(`companies.${index}.startDate`, {
                            required: true,
                          })}
                        />
                        <div className="h-4" />
                      </div>

                      <div>
                        <label>End date *</label>
                        <Input
                          {...register(`companies.${index}.endDate`, {
                            required: true,
                          })}
                        />
                        <div className="h-4" />
                      </div>

                      <Button
                        color="red"
                        disabled={fields.length === 1}
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </Layout>
    </ProtectedRoute>
  );
};

export default ProfileCreate;
