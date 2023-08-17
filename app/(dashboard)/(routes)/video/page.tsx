"use client";
import axios from "axios";
import * as z from "zod";
import Heading from "@/components/Heading";
import { Music, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { useProModalStore } from "@/store/useProModalStore";
import toast from "react-hot-toast";

export default function VideoPage() {
  const router = useRouter();
  const proModal = useProModalStore();
  const [video, setVideo] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values);
      console.log(response);
      setVideo(response.data[0]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Our most recent video generator model"
        icon={Music}
        iconColor="text-orange-700"
        bgColor="bg-orange-50"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border-border border w-full p-4 px-3 
              md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 xl:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 
                      focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A dog playing in the garden"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 xl:col-span-2"
                disabled={isLoading}
              >
                <Sparkles className="w-4 h-4 mr-2 fill-white" />
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4 pb-8">
          {isLoading && (
            <div className="flex justify-center items-center w-full bg-muted rounded-lg p-8 animate-pulse">
              <Loader className="bg-orange-700" />
            </div>
          )}
          {!video && !isLoading && <Empty label="No video generated" />}

          {video && (
            <video controls className="w-full mt-8 aspect-video bg-foreground">
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
