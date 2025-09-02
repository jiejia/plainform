'use client'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from "@heroui/react"
import React from "react"

interface FormModalProps {
    children: React.ReactNode
    title: string
    footer: React.ReactNode|null
    button: React.ReactElement
}


export default function FormModal({children, title, footer, button}: FormModalProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    
    // 克隆button元素并添加onPress事件
    const triggerButton = React.cloneElement(button as any, {
        onPress: () => {
            // 如果原来的button已经有onPress，先调用它
            const props = button.props as any
            if (props?.onPress && typeof props.onPress === 'function') {
                props.onPress()
            }
            onOpen()
        },
        onClick: () => {
            // 如果原来的button已经有onClick，先调用它
            const props = button.props as any
            if (props?.onClick && typeof props.onClick === 'function') {
                props.onClick()
            }
            onOpen()
        }
    })
    
    return (
        <>    
              {triggerButton}
              <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                    <ModalFooter>
                        {footer || <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>}
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}