import { Link } from "@inertiajs/react";
import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

export default function Footer() {
    return (

        <footer className="bg-gray-900 text-white mt-36">
            <div className="max-w-7xl mx-auto px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">AyoDev.id</h3>
                        <p className="text-gray-400 mb-6">
                            Transforming businesses through innovative digital solutions and human-centered design.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/bintang.ydha_" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#products" className="text-gray-400 hover:text-white transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="#articles" className="text-gray-400 hover:text-white transition-colors">
                                    Articles
                                </Link>
                            </li>
                            <li>
                                <Link href="#events" className="text-gray-400 hover:text-white transition-colors">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link href="#gallery" className="text-gray-400 hover:text-white transition-colors">
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Services</h4>
                        <ul className="space-y-3">
                            <li className="text-gray-400">Company Profile</li>
                            <li className="text-gray-400">E-Commerce</li>
                            <li className="text-gray-400">Web Portfolio</li>
                            <li className="text-gray-400">Web Event</li>
                            <li className="text-gray-400">Web Custom</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-gray-400">
                                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <a href="mailto:hello@ayodev.id" className="hover:text-white transition-colors">
                                    hello@ayodev.id
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400">
                                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                                    +62 857-1794-3270
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                B7, Jl. Cipinang Pulo No.19, RT.7/RW.14 , North Cipinang Besar, Jatinegara, East Jakarta City, Jakarta 13410
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} AyoDev.id. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
