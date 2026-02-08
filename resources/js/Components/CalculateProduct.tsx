'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function CalculateProduct() {
    const [selectedOptions, setSelectedOptions] = useState({
        websiteType: 'custom',
        pages: '1-5',
        design: 'standard design',
        features: [] as string[],
        responsive: true,
        cms: false,
        wa: false
    })
    const [hasBudget, setHasBudget] = useState(false)
    const [targetBudget, setTargetBudget] = useState('')

    const pricing = {
        pages: {
            '1-5': 4000000,
            '6-10': 6500000,
            '11-20': 9500000,
            '20+': 15000000
        },
        design: {
            'standard design': 0,
            'custom': 5000000,
            'premium': 12000000
        },
        features: {
            'ecommerce with payment': 6000000,
            'booking no payment': 2000000,
            'payment midtrans': 3000000,
            'product catalog': 2000000,
            'dashboard': 3000000,
            'extra page / 1 page': 350000
        },
        addons: {
            cms: 2000000,
            wa: 250000
        }
    }

    const calculateTotal = () => {
        let total = 0
        total += pricing.pages[selectedOptions.pages as keyof typeof pricing.pages]
        total += pricing.design[selectedOptions.design as keyof typeof pricing.design]
        selectedOptions.features.forEach(feature => {
            total += pricing.features[feature as keyof typeof pricing.features] || 0
        })
        if (selectedOptions.cms) total += pricing.addons.cms
        if (selectedOptions.wa) total += pricing.addons.wa
        return total
    }

    const toggleFeature = (feature: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }))
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price)
    }

    const generateWhatsAppMessage = () => {
        const total = calculateTotal()

        let message = `*Halo AyoDev.id!* \n\n`
        message += `Saya tertarik untuk mendiskusikan project website dengan detail sebagai berikut:\n\n`

        message += ` *Detail Project:*\n`
        message += `━━━━━━━━━━━━━━━━\n`
        message += `• *Website Type:* Custom Website Development\n`
        message += `• *Jumlah Halaman:* ${selectedOptions.pages} pages\n`
        message += `• *Design:* ${selectedOptions.design.charAt(0).toUpperCase() + selectedOptions.design.slice(1)}\n`

        if (selectedOptions.features.length > 0) {
            message += `\n *Special Features:*\n`
            selectedOptions.features.forEach((feature, index) => {
                message += `${index + 1}. ${feature.charAt(0).toUpperCase() + feature.slice(1)}\n`
            })
        }

        if (hasBudget && targetBudget) {
            message += `\n *Target Budget:*\n`
            message += `${formatPrice(Number(targetBudget))}\n`
            message += `*(Open for scope adjustment discussion)*\n`
        }


        if (selectedOptions.cms || selectedOptions.wa) {
            message += `\n *Additional Services:*\n`
            if (selectedOptions.cms) message += `• Content Management System\n`
            if (selectedOptions.wa) message += `• WhatsApp Integration\n`
        }

        message += `\n *Estimasi Harga:*\n`
        message += `${formatPrice(total)}\n\n`

        message += `━━━━━━━━━━━━━━━━\n`
        message += `Mohon informasi lebih lanjut mengenai timeline pengerjaan dan detail teknisnya.\n\n`
        message += `Terima kasih! `

        return encodeURIComponent(message)
    }

    const handleDiscussProject = () => {
        const phoneNumber = '6285717943270'
        const message = generateWhatsAppMessage()
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

        window.open(whatsappUrl, '_blank')
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-20 md:py-32">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                <span className="text-sm font-medium text-blue-700">Cost Estimator</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
                                Project
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                    Calculator
                                </span>
                            </h1>

                            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                                Get an instant estimate for your custom website project. Choose your requirements and see real-time pricing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Calculator Section */}
            <section className="bg-[#FAFAFA] py-20 md:py-32">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Left Column - Form Options */}
                            <div className="space-y-12">
                                {/* Website Type - Disabled */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-[1px] bg-slate-300"></div>
                                        <span className="text-xs tracking-[0.25em] uppercase text-slate-400 font-light">
                                            01
                                        </span>
                                    </div>
                                    <label className="block text-lg font-light text-slate-900">
                                        Website Type
                                    </label>
                                    <select
                                        disabled
                                        className="w-full p-4 border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed appearance-none rounded-none text-sm"
                                    >
                                        <option>Custom Website Development</option>
                                    </select>
                                    <p className="text-xs text-slate-500">Only custom website development available</p>
                                </div>

                                {/* Number of Pages */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-[1px] bg-slate-300"></div>
                                        <span className="text-xs tracking-[0.25em] uppercase text-slate-400 font-light">
                                            02
                                        </span>
                                    </div>
                                    <label className="block text-lg font-light text-slate-900">
                                        Number of Pages
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {Object.keys(pricing.pages).map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setSelectedOptions(prev => ({ ...prev, pages: option }))}
                                                className={`group relative p-4 border transition-all duration-300 ${selectedOptions.pages === option
                                                    ? 'border-slate-900 bg-slate-900'
                                                    : 'border-slate-200 bg-white hover:border-slate-400'
                                                    }`}
                                            >
                                                <div className={`text-sm font-medium transition-colors ${selectedOptions.pages === option ? 'text-white' : 'text-slate-900'
                                                    }`}>
                                                    {option}
                                                </div>
                                                <div className={`text-xs mt-1 transition-colors ${selectedOptions.pages === option ? 'text-white/70' : 'text-slate-500'
                                                    }`}>
                                                    pages
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Design Complexity */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-[1px] bg-slate-300"></div>
                                        <span className="text-xs tracking-[0.25em] uppercase text-slate-400 font-light">
                                            03
                                        </span>
                                    </div>
                                    <label className="block text-lg font-light text-slate-900">
                                        Design Complexity
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {Object.keys(pricing.design).map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setSelectedOptions(prev => ({ ...prev, design: option }))}
                                                className={`p-5 border transition-all duration-300 text-left ${selectedOptions.design === option
                                                    ? 'border-slate-900 bg-slate-900'
                                                    : 'border-slate-200 bg-white hover:border-slate-400'
                                                    }`}
                                            >
                                                <div className={`text-sm font-medium capitalize mb-1 ${selectedOptions.design === option ? 'text-white' : 'text-slate-900'
                                                    }`}>
                                                    {option}
                                                </div>
                                                <div className={`text-xs ${selectedOptions.design === option ? 'text-white/70' : 'text-slate-500'
                                                    }`}>
                                                    {option === 'standard design' ? 'Standard design' : option === 'custom' ? 'Tailored design' : 'Unique & premium'}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-[1px] bg-slate-300"></div>
                                        <span className="text-xs tracking-[0.25em] uppercase text-slate-400 font-light">
                                            04
                                        </span>
                                    </div>
                                    <label className="block text-lg font-light text-slate-900">
                                        Special Features
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {Object.keys(pricing.features).map((feature) => (
                                            <button
                                                key={feature}
                                                onClick={() => toggleFeature(feature)}
                                                className={`p-5 border transition-all duration-300 text-left ${selectedOptions.features.includes(feature)
                                                    ? 'border-slate-900 bg-slate-900'
                                                    : 'border-slate-200 bg-white hover:border-slate-400'
                                                    }`}
                                            >
                                                <div className={`text-sm font-medium capitalize mb-1 ${selectedOptions.features.includes(feature) ? 'text-white' : 'text-slate-900'
                                                    }`}>
                                                    {feature}
                                                </div>
                                                <div className={`text-xs ${selectedOptions.features.includes(feature) ? 'text-white/70' : 'text-slate-500'
                                                    }`}>
                                                    +{formatPrice(pricing.features[feature as keyof typeof pricing.features])}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Add-ons */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-[1px] bg-slate-300"></div>
                                        <span className="text-xs tracking-[0.25em] uppercase text-slate-400 font-light">
                                            05
                                        </span>
                                    </div>
                                    <label className="block text-lg font-light text-slate-900">
                                        Additional Services
                                    </label>
                                    <div className="space-y-3">
                                        <label className="flex items-center justify-between p-5 border border-slate-200 bg-white cursor-pointer hover:border-slate-400 transition-all duration-300 group">
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-slate-900 mb-1">Content Management System</div>
                                                <div className="text-xs text-slate-500">Easy content updates</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs text-slate-400">+{formatPrice(pricing.addons.cms)}</span>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOptions.cms}
                                                    onChange={(e) => setSelectedOptions(prev => ({ ...prev, cms: e.target.checked }))}
                                                    className="w-5 h-5 accent-slate-900"
                                                />
                                            </div>
                                        </label>

                                        <label className="flex items-center justify-between p-5 border border-slate-200 bg-white cursor-pointer hover:border-slate-400 transition-all duration-300">
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-slate-900 mb-1">WhatsApp Integration</div>
                                                <div className="text-xs text-slate-500">Pre-filled message</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs text-slate-400">+{formatPrice(pricing.addons.wa)}</span>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOptions.wa}
                                                    onChange={(e) => setSelectedOptions(prev => ({ ...prev, wa: e.target.checked }))}
                                                    className="w-5 h-5 accent-slate-900"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Price Summary (Sticky) */}
                            <div className="lg:sticky lg:top-8 h-fit">
                                <div className="bg-white border border-slate-200 p-8 md:p-10">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-8 h-[1px] bg-slate-300"></div>
                                        <span className="text-xs tracking-[0.25em] uppercase text-slate-400 font-light">
                                            Summary
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-light text-slate-900 mb-8">
                                        Price Breakdown
                                    </h2>

                                    <div className="space-y-4 mb-8 pb-8 border-b border-slate-200">
                                        <div className="flex justify-between items-start text-sm">
                                            <div>
                                                <div className="text-slate-900 font-medium">Pages</div>
                                                <div className="text-xs text-slate-500 mt-0.5">{selectedOptions.pages} pages</div>
                                            </div>
                                            <span className="text-slate-900 font-light">
                                                {formatPrice(pricing.pages[selectedOptions.pages as keyof typeof pricing.pages])}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-start text-sm">
                                            <div>
                                                <div className="text-slate-900 font-medium">Design</div>
                                                <div className="text-xs text-slate-500 mt-0.5 capitalize">{selectedOptions.design}</div>
                                            </div>
                                            <span className="text-slate-900 font-light">
                                                {formatPrice(pricing.design[selectedOptions.design as keyof typeof pricing.design])}
                                            </span>
                                        </div>

                                        {selectedOptions.features.map(feature => (
                                            <div key={feature} className="flex justify-between items-start text-sm">
                                                <div>
                                                    <div className="text-slate-900 font-medium capitalize">{feature}</div>
                                                    <div className="text-xs text-slate-500 mt-0.5">Feature</div>
                                                </div>
                                                <span className="text-slate-900 font-light">
                                                    {formatPrice(pricing.features[feature as keyof typeof pricing.features])}
                                                </span>
                                            </div>
                                        ))}

                                        {selectedOptions.cms && (
                                            <div className="flex justify-between items-start text-sm">
                                                <div>
                                                    <div className="text-slate-900 font-medium">CMS</div>
                                                    <div className="text-xs text-slate-500 mt-0.5">Add-on</div>
                                                </div>
                                                <span className="text-slate-900 font-light">{formatPrice(pricing.addons.cms)}</span>
                                            </div>
                                        )}

                                        {selectedOptions.wa && (
                                            <div className="flex justify-between items-start text-sm">
                                                <div>
                                                    <div className="text-slate-900 font-medium">WhatsApp</div>
                                                    <div className="text-xs text-slate-500 mt-0.5">Add-on</div>
                                                </div>
                                                <span className="text-slate-900 font-light">{formatPrice(pricing.addons.wa)}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-8">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <span className="text-sm uppercase tracking-wider text-slate-500">Estimated Total</span>
                                        </div>
                                        <div className="text-4xl font-light bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                            {formatPrice(calculateTotal())}
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-4 mb-10">
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={hasBudget}
                                                onChange={(e) => setHasBudget(e.target.checked)}
                                                className="mt-1 w-4 h-4 accent-slate-900"
                                            />
                                            <span className="text-sm text-slate-600">
                                                I have a target budget and would like to discuss scope adjustments
                                            </span>
                                        </label>

                                        {hasBudget && (
                                            <input
                                                type="number"
                                                placeholder="Your target budget (IDR)"
                                                value={targetBudget}
                                                onChange={(e) => setTargetBudget(e.target.value)}
                                                className="w-full p-3 border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
                                            />
                                        )}
                                    </div>


                                    <button
                                        onClick={handleDiscussProject}
                                        className="w-full bg-slate-900 text-white py-4 px-6 hover:bg-slate-800 transition-all duration-300 group flex items-center justify-center gap-2"
                                    >
                                        <span className="text-sm font-medium tracking-wide">Discuss Your Project</span>
                                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </button>

                                    <p className="text-xs text-slate-500 mt-6 text-center leading-relaxed">
                                        Final pricing may vary based on project scope and specific requirements. This is an estimate only.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
