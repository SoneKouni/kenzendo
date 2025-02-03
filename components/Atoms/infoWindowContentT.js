import React from 'react';

const InfoWindowContentT = ({ tunnel }) => {
    const infoWindowStyle = {
        maxWidth: '200px',
        padding: '10px',
        margin: '0',
    };

    return (
        <div style={infoWindowStyle}>
            <h2 style={{ fontSize: '16px', margin: '0 0 10px 0' }}>{tunnel.Name}</h2>
            <p style={{ margin: '0 0 5px 0' }}>ID： {tunnel.Id}</p>
            <p style={{ margin: '0 0 5px 0' }}>事務所： {tunnel.Office}</p>
            <p style={{ margin: '0 0 5px 0' }}>TEL： {tunnel.Tel}</p>
            <p style={{ margin: '0 0 5px 0' }}>架設年： {tunnel.Year + "年"}</p>
            <p style={{ margin: '0 0 5px 0' }}>健全度： {tunnel.Rank}</p>
        </div>
    );
};

export default InfoWindowContentT;
