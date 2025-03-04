"use client";

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    username: 
    z.string()
    .min(2, {message:"ユーザ名は2文字以上で入力してください。"}),
    title: 
    z.string() 
    .min(2, {message:"タイトルは2文字以上で入力してください。"}),
    content: 
    z.string()
    .min(8 , {message:"本文は8文字以上で入力してください。"})
    .max(128, {message: "本文は128文字以内で入力してください。"}),
});

const CreateBBSPage = () => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          title: "",
          content: "",
        },
    });

    async function onSubmit(value: z.infer<typeof formSchema> ){
        const { username, title, content } = value;
        try{
            await fetch("http://localhost:3000/api/post", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ username, title, content }),
            });
            router.push("/");
        }catch(err){
            console.error(err);
        }
    }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/2 px-7">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel >ユーザ名</FormLabel>
            <FormControl>
              <Input placeholder="ユーザ名" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel >タイトル</FormLabel>
            <FormControl>
              <Input placeholder="タイトル" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel >本文</FormLabel>
            <FormControl>
              <Textarea 
                placeholder='投稿内容'
                className='resize-non'
                {...field} 
                />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> 
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default CreateBBSPage