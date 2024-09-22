import {CircularProgress, Modal} from "@mui/material";

type LoaderProps = {
    isPresent: boolean;
}

const Loader = ({isPresent}: LoaderProps) => {
    return (
        <Modal open={isPresent}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(5px)',
                overflow: 'hidden'
            }}>
                <div>
                    <CircularProgress/>
                </div>
            </div>

        </Modal>
    );
};

export default Loader;