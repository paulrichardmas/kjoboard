import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { isEmpty } from "../../../utils";

const JobFilter = ({ onChange }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      company: "",
      title: "",
      appliedDate: "",
      status: "",
    },
  });

  const onSubmit = (data) => {
    const submitData = {};
    for (let key in data) {
      if (!isEmpty(data[key])) {
        submitData[key] = data[key];
      }
    }

    onChange(submitData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 bg-white mb-4 p-2 rounded-lg"
    >
      <Input placeholder="Company Name" {...register("company")} />
      <Input placeholder="Job title" {...register("title")} />
      <Input placeholder="Application Date" {...register("appliedDate")} />
      <select
        className="text-sm border p-2 border-slate-400 rounded-lg"
        {...register("status")}
      >
        <option value="">None</option>
        <option value="not-applied">Not-Applied</option>
        <option value="applied">Applied</option>
        <option value="passed">Passed</option>
        <option value="failed">Failed</option>
      </select>

      <Button>Search</Button>
    </form>
  );
};

export default JobFilter;
