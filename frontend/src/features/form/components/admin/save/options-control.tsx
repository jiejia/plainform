'use client'

import React, { useState } from 'react';
import { Button, Input, Checkbox } from '@heroui/react';
import { Plus, Minus } from 'lucide-react';

interface Option {
  id: string;
  value: string;
  isSelected?: boolean;
}

interface OptionsControlProps {
  label?: string;
  value?: Option[];
  onChange?: (options: Option[]) => void;
  className?: string;
}

export default function OptionsControl({ 
  label = "Options", 
  value = [], 
  onChange,
  className = "" 
}: OptionsControlProps) {
  const [options, setOptions] = useState<Option[]>(
    value.length > 0 ? value : [
      { id: '1', value: 'choose one', isSelected: true },
      { id: '2', value: 'option', isSelected: false },
      { id: '3', value: 'option', isSelected: false },
      { id: '4', value: 'option', isSelected: false },
      { id: '5', value: 'option', isSelected: false },
      { id: '6', value: 'option', isSelected: false }
    ]
  );

  const addOption = (afterId?: string) => {
    const newOption: Option = {
      id: Date.now().toString(),
      value: 'option',
      isSelected: false
    };
    
    let newOptions: Option[];
    if (afterId) {
      // 在指定选项后插入
      const insertIndex = options.findIndex(option => option.id === afterId) + 1;
      newOptions = [
        ...options.slice(0, insertIndex),
        newOption,
        ...options.slice(insertIndex)
      ];
    } else {
      // 在末尾添加
      newOptions = [...options, newOption];
    }
    
    setOptions(newOptions);
    onChange?.(newOptions);
  };

  const removeOption = (id: string) => {
    if (options.length <= 1) return; // 至少保留一个选项
    const newOptions = options.filter(option => option.id !== id);
    setOptions(newOptions);
    onChange?.(newOptions);
  };

  const updateOption = (id: string, value: string) => {
    const newOptions = options.map(option => 
      option.id === id ? { ...option, value } : option
    );
    setOptions(newOptions);
    onChange?.(newOptions);
  };

  const toggleOption = (id: string) => {
    const newOptions = options.map(option => ({
      ...option,
      isSelected: option.id === id ? !option.isSelected : option.isSelected
    }));
    setOptions(newOptions);
    onChange?.(newOptions);
  };

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={option.id} className="flex items-center gap-2 bg-white rounded-md p-2 border border-gray-100 shadow-sm">
              <Checkbox
                isSelected={option.isSelected || false}
                onValueChange={() => toggleOption(option.id)}
                size="sm"
              />
              <Input
                value={option.value}
                onChange={(e) => updateOption(option.id, e.target.value)}
                variant="flat"
                size="sm"
                className="flex-1"
              />
              <div className="flex gap-1">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="primary"
                  className="min-w-7 w-7 h-7"
                  onPress={() => addOption(option.id)}
                >
                  <Plus size={12} />
                </Button>
                {options.length > 1 && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="danger"
                    className="min-w-7 w-7 h-7"
                    onPress={() => removeOption(option.id)}
                  >
                    <Minus size={12} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
