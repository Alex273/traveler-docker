import React, {FC} from 'react';

interface userData {
    name: string;
}

export const View: FC<userData> = ({name}) => {
    return <div>Hello, {name}</div>;
};
