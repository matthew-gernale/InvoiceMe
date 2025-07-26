type Variant = "success" | "info" | "warning" | "error";

type SnackBarData = {
    title: string;
    description?: string;
    variant: Variant;
    hideDuration?: number;
};

type SnackBarHandler = (data: SnackBarData) => void;

class SnackBarInstance {
    private handler: SnackBarHandler | null = null;

    setHandler(handler: SnackBarHandler) {
        this.handler = handler;
    }

    show(data: SnackBarData) {
        if (this.handler) this.handler(data);
    }
}

const snackbarInstance = new SnackBarInstance();
export default snackbarInstance;