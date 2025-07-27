import Alert from "../../../components/ui/alert/Alert";

type HeaderProps = {
    title: string;
    description: string;
    variant: "success" | "error" | "warning" | "info";
};

function ApprovalHeader({ title, description, variant }: HeaderProps) {
    return (
        <div className="my-5">
            <Alert
                variant={variant}
                title={title}
                message={description}
                showLink={false}
            />
        </div>
    );
}

export default ApprovalHeader;