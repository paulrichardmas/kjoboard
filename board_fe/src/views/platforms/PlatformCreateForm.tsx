import React from "react";
import { useForm } from "react-hook-form";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const PlatformCreateForm = ({ onCreate }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      platformUrl: "",
      company: "",
      title: "",
      location: "",
      description: "",
      applications: "",
      postedDate: "",
    },
  });

  return (
    <Card>
      <p>Platform create</p>
      <form className="flex flex-wrap gap-2" onSubmit={handleSubmit(onCreate)}>
        <div>
          <label>Name</label>
          <Input {...register("name", { required: true })} />
          <div className="h-4" />
        </div>
        <div>
          <label>Platform Url</label>
          <Input {...register("platformUrl", { required: true })} />
          <div className="h-4" />
        </div>
        <div>
          <label>Company</label>
          <Input {...register("company", { required: true })} />
          <div className="h-4" />
        </div>
        <div>
          <label>Title</label>
          <Input {...register("title", { required: true })} />
          <div className="h-4" />
        </div>
        <div>
          <label>Location</label>
          <Input {...register("location", { required: true })} />
          <div className="h-4" />
        </div>
        <div>
          <label>Description</label>
          <Input {...register("description", { required: true })} />
          <div className="h-4" />
        </div>
        <div>
          <label>Applications</label>
          <Input {...register("applications", { required: true })} />
          <div className="h-4" />
        </div>
        <div>
          <label>Posted Date</label>
          <Input {...register("postedDate", { required: true })} />
          <div className="h-4" />
        </div>
        <Button className="w-full">Add new</Button>
      </form>
    </Card>
  );
};

export default PlatformCreateForm;
