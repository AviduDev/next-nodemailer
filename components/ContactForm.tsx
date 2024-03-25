"use client";

import React from "react";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

// form data validation using zod
const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  message: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

// types for form values
type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API. Default values for the form fields.
const defaultValues: Partial<ProfileFormValues> = {
  name: "",
  email: "",
  message: "",
};

// Function for when to check if the form is valid
const GmailForm = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // ---------------------------------------------------------

  const submitForm = async (data: ProfileFormValues) => {
    toast({
      title: "Hold on!",
    });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error sending email");
      }

      const responseData = await response.json();
      // Handle response data as needed

      // Add toast here
      toast({
        variant: "default",
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Message not sent!",
        description: "We'll fix the problem ASAP.",
      });
      // Handle error as needed
    }
  };

  return (
    <Form {...form}>
      {/* What to do on submit/ the Form comp wraps the original form */}
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-8">
        {/* Single form field/ Name/ Formfield is self closing */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              {/* Give a lable for the form field */}
              <FormLabel>Name</FormLabel>

              {/* Input field */}
              <FormControl>
                <Input
                  placeholder="Type your name here"
                  autoComplete="true"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Type well remembered name, because we dont save your data{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type your email here"
                  autoComplete="true"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Use short and sweet email, we dont save your data
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here"
                  className="resize-none"
                  {...field}
                  autoComplete="true"
                />
              </FormControl>
              <FormDescription>
                Clearly describe your problem, cuz we dont have much time
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default GmailForm;
