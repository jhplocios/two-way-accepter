import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components'

const StyledTextArea = styled(TextareaAutosize)`
    width: 500px;
    margin: 10px 0;
`;

export default function MinHeightTextarea({ stateFlow, onChange }) {
    return (
        <>
            <InputLabel>State Machine Configuration</InputLabel>
            <StyledTextArea aria-label="minimum height" minRows={20} placeholder="test" onChange={e => onChange(e)} value={stateFlow} />
        </>
    )
}