import { StatusMessage } from '../types';

type Props = {
    statusMessage: StatusMessage;
};

const StatusMessageParser: React.FC<Props> = ({ statusMessage }) => {
    return (
        <div>
            {statusMessage && (
                <div
                    className={`text-center alert ${
                        statusMessage.type === 'success' ? 'alert-success' : 'alert-danger'
                    }`}
                >
                    {statusMessage.message}
                </div>
            )}
        </div>
    );
};

export default StatusMessageParser;
