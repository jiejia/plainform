import {ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button, useDisclosure} from "@heroui/react";
import React from "react";


export default function Modal({ children, className = '' }: { children: React.ReactNode, className?: string }) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className="flex flex-col gap-1">高级搜索</ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="flat" onPress={onClose}>
                            Reset
                        </Button>
                        <Button color="primary" onPress={onClose}>
                            Search
                        </Button>
                    </ModalFooter>
                </>)}
            </ModalContent>
        </Modal>
    );
}