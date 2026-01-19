import { EditParentClient } from "./edit-parent-client"

interface EditParentPageProps {
    params: Promise<{
        id: string
    }>
}

export function generateStaticParams() {
    return [{ id: "1" }]
}

export default async function EditParentPage({ params }: EditParentPageProps) {
    const { id } = await params

    return <EditParentClient id={id} />
}