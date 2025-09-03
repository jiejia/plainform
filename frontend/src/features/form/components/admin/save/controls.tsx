'use client'

import { Hash, Mail, Type, Text, CheckSquare, Phone, Calendar, Clock, ChevronDown, Circle } from "lucide-react";
import { Upload } from "lucide-react";
import { Star } from "lucide-react";
import React from "react";


export default function Controls() {
    return (
        <ul className="grid grid-cols-1 gap-2 h-full">
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <Type size={18} className="text-blue-500"/>
            <span className="text-sm font-medium">单行文本</span>
        </li>
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <Text size={18} className="text-green-500"/>
            <span className="text-sm font-medium">多行文本</span>
        </li>
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <Hash size={18} className="text-purple-500"/>
            <span className="text-sm font-medium">数字</span>
        </li>
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <Mail size={18} className="text-red-500"/>
            <span className="text-sm font-medium">邮箱</span>
        </li>
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <Phone size={18} className="text-orange-500"/>
            <span className="text-sm font-medium">电话</span>
        </li>
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <Calendar size={18} className="text-cyan-500"/>
            <span className="text-sm font-medium">日期</span>
        </li>
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <Clock size={18} className="text-indigo-500"/>
            <span className="text-sm font-medium">时间</span>
        </li>
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <ChevronDown size={18} className="text-teal-500"/>
            <span className="text-sm font-medium">下拉选择</span>
        </li>
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <CheckSquare size={18} className="text-pink-500"/>
            <span className="text-sm font-medium">多选框</span>
        </li>
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <Circle size={18} className="text-yellow-500"/>
            <span className="text-sm font-medium">单选框</span>
        </li>
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <Upload size={18} className="text-gray-500"/>
            <span className="text-sm font-medium">文件上传</span>
        </li>
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <Star size={18} className="text-amber-500"/>
            <span className="text-sm font-medium">评分</span>
        </li>
        <li className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors">
            <Star size={18} className="text-amber-500"/>
            <span className="text-sm font-medium">评分</span>
        </li>
    </ul>
    )
}