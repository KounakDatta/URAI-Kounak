// 'use client';
// import { toast } from 'sonner';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { signIn } from "next-auth/react";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { PasswordInput } from '@/components/ui/password-input';
// import { PhoneInput } from '@/components/ui/phone-input';
// import { Checkbox } from '@/components/ui/checkbox';
// import Link from "next/link";
// import { FcGoogle } from "react-icons/fc";

// const formSchema = z.object({
//   full_name: z
//     .string()
//     .min(3, { message: 'Full Name must have at least 3 character.' })
//     .max(100, 'Full Name cannot exceed 100 characters.'),
//   email: z.string().email('Please provide a valid email address.'),
//   password: z
//     .string()
//     .min(8, 'Password must be at least 8 characters.')
//     .max(40, 'Password cannot exceed 40 characters.')
//     .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
//     .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
//     .regex(/[0-9]/, 'Password must contain at least one number.')
//     .regex(/[\W_]/, 'Password must contain at least one special character.'),
//   mobile_number: z.string(),
//   terms: z
//     .boolean()
//     .default(false)
//     .refine((val) => val === true, 'You must accept the terms and conditions.'),
// });

// export default function RegisterForm() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       console.log(values);
//       toast(
//         <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
//           <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
//         </pre>
//       );
//     } catch (error) {
//       console.error('Form submission error', error);
//       toast.error('Failed to submit the form. Please try again.');
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className='space-y-4 max-w-3xl mx-auto py-10'
//       >
//         <FormField
//           control={form.control}
//           name='full_name'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Full Name</FormLabel>
//               <FormControl>
//                 <Input placeholder='Jhon doe' type='' {...field} />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name='email'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email Address</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder='example@domain.com'
//                   type='email'
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription>
//                 We&apos;ll send verification emails to this address.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name='password'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Create Password</FormLabel>
//               <FormControl>
//                 <PasswordInput
//                   placeholder='Enter a strong password'
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription>
//                 Use at least 8 characters, including letters and numbers.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name='mobile_number'
//           render={({ field }) => (
//             <FormItem className='flex flex-col items-start'>
//               <FormLabel>Mobile Number</FormLabel>
//               <FormControl className='w-full'>
//                 <PhoneInput
//                   placeholder='1234567689'
//                   {...field}
//                   defaultCountry='TR'
//                 />
//               </FormControl>
//               <FormDescription>Enter a valid phone number</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name='terms'
//           render={({ field }) => (
//             <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
//               <FormControl>
//                 <Checkbox
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <div className='space-y-1 leading-none'>
//                 <FormLabel>Agree to Terms & Conditions</FormLabel>

//                 <FormMessage />
//               </div>
//             </FormItem>
//           )}
//         />
//         <Button className='w-full' type='submit'>
//           Submit
//         </Button>
//         {/* Google Signup Button */}
//         <Button
//             className="w-full flex items-center justify-center gap-2 mt-2 bg-white text-black border border-gray-300"
//             type="button"
//             onClick={() => signIn("google")}
//           >
//           <FcGoogle className="w-5 h-5" /> Sign up with Google
//           </Button>

//           <div className="text-center text-sm text-gray-500">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-500 hover:underline">
//               Log in
//             </Link>
//           </div>
//       </form>
//     </Form>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const registerSchema = z.object({
  full_name: z.string().min(3, "Full Name must have at least 3 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Must contain an uppercase letter.")
    .regex(/[a-z]/, "Must contain a lowercase letter.")
    .regex(/[0-9]/, "Must contain a number.")
    .regex(/[\W_]/, "Must contain a special character."),
  country: z.string().min(2, "Country must be specified."),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms."),
});

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.full_name,
          email: values.email,
          password: values.password,
          country: values.country,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      toast.success("Signup successful! Please check your email for verification.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="example@domain.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter a strong password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms Checkbox */}
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>I agree to the terms & conditions</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          {/* Google Signup Button */}
          <Button
            className="w-full flex items-center justify-center gap-2 mt-2 bg-white text-black border border-gray-300"
            type="button"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="w-5 h-5" /> Sign up with Google
          </Button>

          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
