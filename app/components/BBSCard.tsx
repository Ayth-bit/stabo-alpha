import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BBSData } from '../types/types';

interface bbsDataProps{
    bbsData: BBSData;
}
const BBSCard = ({bbsData}: bbsDataProps ) => {

    const {id, title, content, username} = bbsData;
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{username}</CardDescription>
                </CardHeader>
                <CardContent>
                {content}
                </CardContent>
                <CardFooter>
                    <Link href={`/bbs-posts/${id}`} className="text-blue-500 ">Read more</Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default BBSCard