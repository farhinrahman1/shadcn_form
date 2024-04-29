"use client";
import { FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";

const formSchema = zod
  .object({
    emailAddress: zod.string().email(),
    password: zod.string().min(5),
    passwordConfirm: zod.string().min(5),
    projectType: zod.enum(["personal", "professional"]),
    projectName: zod.string().optional(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  )
  .refine(
    (data) => {
      if (data.projectType === "professional") {
        return data.projectName !== undefined;
      }
      return true;
    },
    {
      message: "Project name is required for professional projects",
      path: ["projectName"],
    }
  );

export default function Home() {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      passwordConfirm: "",
      projectName: "",
    },
  });
  const projectType = form.watch("projectType");

  const handleSubmit = (values: zod.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <main className="flex min-h-screen bg-slate-900 flex-col items-center justify-center gap-y-3 h-full">
      <h1 className="text-white font-bold font-sans text-2xl ">
        Project Form <span className="text-sm font-sans">(shadcn)</span>
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-80 w-full gap-y-4 flex flex-col  items-center justify-center p-4 bg-white shadow-xl shadow-black rounded-md"
        >
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="mx-1">Project Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger style={{ width: 230 }}>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage></FormMessage>
                </FormItem>
              );
            }}
          />
          {projectType === "professional" && (
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Name" {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                );
              }}
            />
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              );
            }}
          />

          <button
            className="bg-gray-900 text-white hover:bg-gray-950 p-2 rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Form>
    </main>
  );
}
