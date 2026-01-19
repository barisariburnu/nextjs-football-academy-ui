import { EditTeamClient } from "./edit-team-client"

interface EditTeamPageProps {
    params: Promise<{
        id: string
    }>
}

export function generateStaticParams() {
    return [{ id: "1" }]
}

export default async function EditTeamPage({ params }: EditTeamPageProps) {
    const { id } = await params

    return <EditTeamClient id={id} />
}