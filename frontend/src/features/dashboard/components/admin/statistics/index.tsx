import { Card, CardBody } from "@heroui/react"


export default function Index() {
    return (
        <div className="grid md:grid-rows-[2fr_5fr_5fr] grid-rows-[4fr_8fr]  gap-4 h-full">
            <div className="grid md:grid-cols-[1fr_1fr_1fr_1fr] grid-cols-[1fr_1fr]  gap-4">
                <Card>
                    <CardBody>
                        <div className="grid grid-cols-[2fr_1fr] h-full content-center">

                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="grid grid-cols-[2fr_1fr] h-full content-center">

                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="grid grid-cols-[2fr_1fr] h-full content-center">

                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="grid grid-cols-[2fr_1fr] h-full content-center">

                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="grid md:grid-cols-[1fr_1fr] grid-cols-[1fr] gap-4">
                <Card>
                    <CardBody>
                        <div className="grid grid-rows-[auto_1fr] h-full">

                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="grid grid-rows-[auto_1fr] h-full">

                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="grid md:grid-cols-[1fr_1fr] grid-cols-[1fr] gap-4">
                <Card>
                    <CardBody>
                        <div className="grid grid-rows-[auto_1fr] h-full">

                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="grid grid-rows-[auto_1fr] h-full">
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}