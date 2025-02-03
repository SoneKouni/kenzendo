const InfoWindowContent = ({ bridge }) => {
  const infoWindowStyle = {
    maxWidth: '200px',
    padding: '10px',
    margin: '0',
  };

  return (
    <div style={infoWindowStyle}>
      <h2 style={{ fontSize: '16px', margin: '0 0 10px 0' }}>{bridge.Name}</h2>
      <p style={{ margin: '0 0 5px 0' }}>ID： {bridge.Id}</p>
      <p style={{ margin: '0 0 5px 0' }}>事務所： {bridge.Office}</p>
      <p style={{ margin: '0 0 5px 0' }}>TEL： {bridge.Tel}</p>
      {bridge.Year != null && <p style={{ margin: '0 0 5px 0' }}>架設年： {bridge.Year + "年"}</p>}
      <p style={{ margin: '0 0 5px 0' }}>健全度： {bridge.Rank}</p>
    </div>
  );
};

export default InfoWindowContent;