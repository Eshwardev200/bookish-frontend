import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "./Loader";
import { useAuth } from "@/context/AuthProvider";

export default function BookForm({
  formTitle = "Form",
  submitLabel = "Submit",
  fields,
  handler,
  resetValues = null,
}) {
  const { loading } = useAuth();
  const schemaShape = {};
  const defaultValues = {};

  fields.forEach((field) => {
    if (field.type === "number") {
      schemaShape[field.name] = z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z
          .number({
            invalid_type_error: `${field.label} must be a number`,
          })
          .min(0, `${field.label} is required`)
      );
    } else {
      schemaShape[field.name] = z.string().min(1, `${field.label} is required`);
    }

    defaultValues[field.name] = field.defaultValue || "";
  });

  const formSchema = z.object(schemaShape);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (resetValues) {
      form.reset(resetValues);
    }
  }, [resetValues, form]);

  const onSubmit = (values) => {
    handler(values);
  };

  return (
    <Card className="w-full max-w-md shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          {formTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: rf }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={field.type || "text"}
                        placeholder={field.placeholder}
                        {...rf}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader className="size-7 text-black" />
              ) : (
                submitLabel
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
