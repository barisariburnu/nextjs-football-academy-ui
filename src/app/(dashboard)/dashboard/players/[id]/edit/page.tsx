import { EditPlayerClient } from "./edit-player-client"

interface EditPlayerPageProps {
    params: Promise<{
        id: string
    }>
}

export function generateStaticParams() {
    return [{ id: "1" }]
}

export default async function EditPlayerPage({ params }: EditPlayerPageProps) {
    const { id } = await params

    return <EditPlayerClient id={id} />
}