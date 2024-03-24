'use client';
import { Lightbulb } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { newRequest } from '@/lib/newRequest';
import { useState } from 'react';

const FormSchema = z.object({
  lighting: z.boolean().default(false).optional(),
});

export function Light() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lighting: false,
    },
  });
  const [lightingState, setLightingState] = useState(form.getValues().lighting);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const res = await newRequest.post('/controlDevice', {
      topic: 'den',
      message: data.lighting ? 'on' : 'off',
    });
    setTimeout(() => {
      setLightingState(res.data === 'on' ? true : false);
    }, 200);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div>
          <div className="">
            <FormField
              control={form.control}
              name="lighting"
              render={({ field }) => (
                <FormItem
                  className={`flex flex-col gap-4 items-center justify-between rounded-lg border p-3 shadow-sm `}
                >
                  <div className="">
                    <FormLabel>
                      {lightingState == true ? (
                        <Lightbulb size={60} color="#F7E372" />
                      ) : (
                        <Lightbulb size={60} />
                      )}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={lightingState}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        form.handleSubmit(onSubmit)();
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
