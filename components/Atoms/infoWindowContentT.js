import React from 'react';

const InfoWindowContentT = ({ tunnel, onInspect, onCancel }) => {
    const infoWindowStyle = {
        maxWidth: '200px',
        padding: '10px',
        margin: '0',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
    };

    return (
        <div style={infoWindowStyle}>
            <h2 style={{ fontSize: '16px', margin: '0 0 10px 0' }}>{tunnel.Name}</h2>
            <p style={{ margin: '0 0 5px 0' }}>ID： {tunnel.Id}</p>
            <p style={{ margin: '0 0 5px 0' }}>事務所： {tunnel.Office}</p>
            <p style={{ margin: '0 0 5px 0' }}>TEL： {tunnel.Tel}</p>
            {tunnel.Year != null && <p style={{ margin: '0 0 5px 0' }}>架設年： {tunnel.Year + "年"}</p>}
            <p style={{ margin: '0 0 5px 0' }}>健全度： {tunnel.Rank}</p>
            <div style={buttonContainerStyle}>
                <button style={{ padding: '5px 10px', marginRight: '5px' }} onClick={() => onInspect(tunnel.Id)}>点検</button>
                <button style={{ padding: '5px 10px' }} onClick={() => onCancel(tunnel.Id)}>キャンセル</button>
            </div>
        </div>
    );
};

export default InfoWindowContentT;