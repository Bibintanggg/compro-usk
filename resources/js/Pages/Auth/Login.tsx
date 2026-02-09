import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox as ShadcnCheckbox } from '@/Components/ui/checkbox';
import { Client } from '@/features/clients/types';
import { PageProps } from '@/types';

interface LoginProps  extends PageProps {
    totalCustomer: number
}
export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const { totalCustomer } = usePage<LoginProps>().props

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen flex">
                {/* Left Side - Login Form */}
                <div className="flex-1 flex items-center justify-center p-8 bg-white">
                    <div className="w-full max-w-md space-y-8">
                        {/* Logo & Title */}
                        <div className="space-y-3">
                            <div className="inline-block">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-7 h-7 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                                Welcome back
                            </h1>
                            <p className="text-gray-500 text-lg">
                                Enter your credentials to access your account
                            </p>
                        </div>

                        {status && (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm font-medium text-green-800">
                                    {status}
                                </p>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={submit} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-900"
                                >
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoComplete="username"
                                    autoFocus
                                    placeholder="name@company.com"
                                    className="h-12 text-base border-gray-300 focus:border-black focus:ring-black"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium text-gray-900"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="h-12 text-base border-gray-300 focus:border-black focus:ring-black"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <ShadcnCheckbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) =>
                                            setData('remember', checked as boolean)
                                        }
                                        className="border-gray-300"
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm text-gray-700 cursor-pointer select-none"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                {/* {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                )} */}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full h-12 bg-black hover:bg-gray-800 text-white text-base font-medium transition-all duration-200 disabled:opacity-50"
                            >
                                {processing ? (
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="animate-spin h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </form>

                        {/* Footer */}
                        {/* <div className="text-center pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    href="#"
                                    className="font-medium text-gray-900 hover:text-gray-600 transition-colors"
                                >
                                    Contact sales
                                </Link>
                            </p>
                        </div> */}
                    </div>
                </div>

                {/* Right Side - Visual Section */}
                <div className="hidden lg:flex flex-1 bg-zinc-900 p-12 items-center justify-center relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-20 w-72 h-72 border border-white rounded-full" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 border border-white rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-lg space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-bold text-white leading-tight">
                                Manage your business with confidence
                            </h2>
                            <p className="text-xl text-gray-300">
                                Access powerful tools and insights to help your company grow and succeed in the digital age.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-8 pt-8">
                            {/* <div className="space-y-1">
                                <p className="text-4xl font-bold text-white">99.9%</p>
                                <p className="text-sm text-gray-400">Uptime</p>
                            </div> */}
                            <div className="space-y-1">
                                <p className="text-4xl font-bold text-white">{totalCustomer}</p>
                                <p className="text-sm text-gray-400">Clients</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-4xl font-bold text-white">24/7</p>
                                <p className="text-sm text-gray-400">Support</p>
                            </div>
                        </div>

                        {/* Testimonial */}
                        {/* <div className="pt-8 space-y-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-lg text-gray-300 italic">
                                "This platform has transformed the way we operate. The interface is intuitive and the features are exactly what we needed."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full" />
                                <div>
                                    <p className="text-white font-medium">Sarah Johnson</p>
                                    <p className="text-sm text-gray-400">CEO, TechCorp</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
