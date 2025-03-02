import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const BBSCard = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex perferendis, beatae dolor soluta voluptas obcaecati veniam eaque explicabo fuga expedita accusamus? Nemo id iusto doloribus inventore repellat? Quaerat, iusto ipsum!
                </CardContent>
                <CardFooter>
                    <Link href={"/"} className="text-blue-500 ">Read more</Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default BBSCard