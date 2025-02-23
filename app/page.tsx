import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid lg: grid-cols-3 px-4 py-4 gap-4 ">
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
    </main>
  );
}
