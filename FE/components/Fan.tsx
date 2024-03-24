import { Fan } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react'; // Import useState hook
import { Button } from '@/components/ui/button';
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

const FormSchema = z.object({
  fan: z.boolean().default(false).optional(),
});

export function Fanctrl() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fan: false,
    },
  });

  const [switchValue, setSwitchValue] = useState(form.getValues().fan);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const res = await newRequest.post('/controlDevice', {
      topic: 'quat',
      message: data.fan ? 'on' : 'off',
    });

    setTimeout(() => {
      setSwitchValue(res.data === 'on' ? true : false);
    }, 200);
  };

  return (
    <div>
      <div></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div>
            <div className="">
              <FormField
                control={form.control}
                name="fan"
                render={({ field }) => (
                  <FormItem
                    className={`flex flex-col gap-4 items-center justify-between rounded-lg border p-3 shadow-sm 
                  }`}
                  >
                    <div className="">
                      <FormLabel>
                        <Fan
                          size={60}
                          className={`inline-block ${
                            switchValue ? 'animate-spin' : ''
                          }`}
                        />
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={switchValue}
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
    </div>
  );
}
