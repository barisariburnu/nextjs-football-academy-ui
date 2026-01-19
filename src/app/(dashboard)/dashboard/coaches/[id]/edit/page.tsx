import { EditCoachClient } from "./edit-coach-client"

interface EditCoachPageProps {
    params: Promise<{
        id: string
    }>
}

export function generateStaticParams() {
    return [{ id: "1" }]
}

export default async function EditCoachPage({ params }: EditCoachPageProps) {
    const { id } = await params

    return <EditCoachClient id={id} />
}