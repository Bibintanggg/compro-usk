'use client'

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
} from "@/Components/ui/input-group"
import TextareaAutosize from "react-textarea-autosize"
import React, { ChangeEvent, useEffect, useState } from "react";
import { Captions, FolderUp, MoveLeftIcon, PaintBucket, UploadIcon, UserStar, Upload, X, Image as ImageIcon, Check, Sparkles, FileText, User } from 'lucide-react'
import { FileInput, Label } from "flowbite-react";
import { Field, FieldDescription, FieldLabel } from "@/Components/ui/field"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button";

type ArticleFormProps = {
    data: {
        title: string
        author: string
        content: string
        thumbnail: File | null
    }
    errors: Record<string, string>
    processing: boolean

    onChange: (key: string, value: any) => void
    onSubmit: (e: React.FormEvent) => void
    fileName?: string
}

export default function ArticleForm({
    data, errors, processing, onChange, onSubmit, fileName
}: ArticleFormProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    useEffect(() => {
        if (data.thumbnail) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(data.thumbnail);
        } else {
            setPreview(null);
        }
    }, [data.thumbnail]);

    const completionPercentage =
        (data.title ? 33.33 : 0) +
        (data.author ? 33.33 : 0) +
        (data.content ? 33.34 : 0);

    return (
        <form onSubmit={onSubmit} className="min-h-screen bg-[#FAFAFA]">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

                * {
                    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                }

                .card {
                    background: white;
                    border: 1px solid #E8E8E8;
                    border-radius: 16px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .card:hover {
                    border-color: #D0D0D0;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
                }

                .card.focused {
                    border-color: #000;
                    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
                }

                .field-input {
                    border: none;
                    background: transparent;
                    width: 100%;
                    font-size: 1rem;
                    padding: 0.75rem 0;
                    transition: all 0.2s ease;
                }

                .field-input:focus {
                    outline: none;
                }

                .field-input::placeholder {
                    color: #A0A0A0;
                }

                .upload-card {
                    border: 2px dashed #D0D0D0;
                    background: #F8F8F8;
                    border-radius: 16px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .upload-card:hover {
                    border-color: #000;
                    background: #FAFAFA;
                    transform: translateY(-2px);
                }

                .upload-card.has-image {
                    border-style: solid;
                    border-color: #000;
                    padding: 0;
                    background: white;
                }

                .preview-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    display: flex;
                    align-items: flex-end;
                    padding: 1.5rem;
                }

                .preview-container:hover .preview-overlay {
                    opacity: 1;
                }

                .submit-btn {
                    background: #000;
                    color: white;
                    padding: 1rem 2.5rem;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 0.9375rem;
                    transition: all 0.3s ease;
                    border: none;
                }

                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                }

                .submit-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .progress-ring {
                    transform: rotate(-90deg);
                }

                .progress-ring-circle {
                    transition: stroke-dashoffset 0.5s ease;
                }

                .icon-badge {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #F5F5F5;
                    transition: all 0.3s ease;
                }

                .card.focused .icon-badge {
                    background: #000;
                    color: white;
                }

                .completion-badge {
                    background: linear-gradient(135deg, #000 0%, #333 100%);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 100px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slide {
                    animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .delay-1 { animation-delay: 0.1s; }
                .delay-2 { animation-delay: 0.2s; }
                .delay-3 { animation-delay: 0.3s; }
                .delay-4 { animation-delay: 0.4s; }

                .badge-small {
                    background: #F0F0F0;
                    color: #404040;
                    padding: 0.25rem 0.75rem;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .error-text {
                    color: #EF4444;
                    font-size: 0.8125rem;
                    margin-top: 0.5rem;
                    font-weight: 500;
                }

                textarea {
                    min-height: 200px;
                }
            `}</style>

            <div className="max-w-4xl mx-auto px-6 py-12">

                <div className="mb-10">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                New Article
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Share your thoughts with the world
                            </p>
                        </div>
                        <div className="completion-badge">
                            <svg className="w-5 h-5" viewBox="0 0 20 20">
                                <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                                <circle
                                    cx="10"
                                    cy="10"
                                    r="8"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeDasharray={`${2 * Math.PI * 8}`}
                                    strokeDashoffset={`${2 * Math.PI * 8 * (1 - completionPercentage / 100)}`}
                                    transform="rotate(-90 10 10)"
                                    strokeLinecap="round"
                                />
                            </svg>
                            {completionPercentage}% Complete
                        </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                </div>

                <div className="space-y-5">

                    <div
                        className={`card p-6 animate-slide delay-1 ${focusedField === 'title' ? 'focused' : ''}`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="icon-badge flex-shrink-0">
                                <FileText className="w-5 h-5" strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Article Title
                                    </label>
                                    {data.title && (
                                        <span className="badge-small">
                                            ✓ Filled
                                        </span>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => onChange('title', e.target.value)}
                                    onFocus={() => setFocusedField('title')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Enter a compelling title for your article..."
                                    className="field-input text-lg font-medium"
                                />
                                {errors.title && (
                                    <p className="error-text">{errors.title}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div
                        className={`card p-6 animate-slide delay-2 ${focusedField === 'author' ? 'focused' : ''}`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="icon-badge flex-shrink-0">
                                <User className="w-5 h-5" strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Author Name
                                    </label>
                                    {data.author && (
                                        <span className="badge-small">
                                            ✓ Filled
                                        </span>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    value={data.author}
                                    onChange={(e) => onChange('author', e.target.value)}
                                    onFocus={() => setFocusedField('author')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Who's writing this?"
                                    className="field-input"
                                />
                                {errors.author && (
                                    <p className="error-text">{errors.author}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="animate-slide delay-3">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-semibold text-gray-700">
                                Cover Image <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            {data.thumbnail && (
                                <span className="badge-small">
                                    ✓ Uploaded
                                </span>
                            )}
                        </div>

                        {preview ? (
                            <div className="upload-card has-image overflow-hidden relative preview-container">
                                <div className="aspect-video">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="preview-overlay">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onChange('thumbnail', null);
                                            setPreview(null);
                                        }}
                                        className="bg-white text-black px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                                    >
                                        <X className="w-4 h-4" strokeWidth={2.5} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Label
                                htmlFor="thumbnail"
                                className="upload-card p-12 flex flex-col items-center justify-center text-center"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-4">
                                    <ImageIcon className="w-7 h-7 text-gray-400" strokeWidth={2} />
                                </div>
                                <p className="text-base font-semibold text-gray-900 mb-1">
                                    Upload cover image
                                </p>
                                <p className="text-sm text-gray-500">
                                    PNG, JPG or WEBP · Max 2MB
                                </p>
                                <FileInput
                                    id="thumbnail"
                                    className="hidden"
                                    onChange={(e) => onChange('thumbnail', e.target.files?.[0] ?? null)}
                                    accept="image/*"
                                />
                            </Label>
                        )}
                        {errors.thumbnail && (
                            <p className="error-text">{errors.thumbnail}</p>
                        )}
                    </div>

                    <div
                        className={`card p-6 animate-slide delay-4 ${focusedField === 'content' ? 'focused' : ''}`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="icon-badge flex-shrink-0">
                                <PaintBucket className="w-5 h-5" strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Article Content
                                    </label>
                                    <div className="flex items-center gap-3">
                                        {data.content && (
                                            <span className="text-xs text-gray-500">
                                                {data.content.length} characters
                                            </span>
                                        )}
                                        {data.content && (
                                            <span className="badge-small">
                                                ✓ Filled
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <TextareaAutosize
                                    value={data.content}
                                    onChange={(e) => onChange('content', e.target.value)}
                                    onFocus={() => setFocusedField('content')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Start writing your article content here..."
                                    className="field-input resize-none"
                                    minRows={8}
                                />
                                {errors.content && (
                                    <p className="error-text">{errors.content}</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-10 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {completionPercentage === 100 ? (
                                <div className="flex items-center gap-2 text-green-600">
                                    <Check className="w-5 h-5" strokeWidth={2.5} />
                                    <span className="text-sm font-semibold">Ready to publish!</span>
                                </div>
                            ) : (
                                <span className="text-sm text-gray-500">
                                    {3 - [data.title, data.author, data.content].filter(Boolean).length} required field(s) remaining
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing || completionPercentage !== 100}
                            className="submit-btn"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Publishing...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" strokeWidth={2} />
                                    Publish Article
                                </span>
                            )}
                        </button>
                    </div>
                </div>

            </div>
        </form>
    )
}
