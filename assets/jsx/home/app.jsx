
const { Map, TileLayer, Marker, Popup } = window.ReactLeaflet;

const stamenTonerTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.9528, -75.1638];
const zoomLevel = 12;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentZoomLevel: zoomLevel };
    }

    componentDidMount() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.on('zoomend', () => {
            const updatedZoomLevel = leafletMap.getZoom();
            this.handleZoomLevelChange(updatedZoomLevel);
        });
    }

    handleZoomLevelChange(newZoomLevel) {
        this.setState({ currentZoomLevel: newZoomLevel });
    }

    render() {
        window.console.log('this.state.currentZoomLevel ->', this.state.currentZoomLevel);

        var styles = {
            width: "100%" ,
            height: "100%" 
        }

        return (
            <Map
                ref={m => { this.leafletMap = m; }}
                center={mapCenter}
                zoom={zoomLevel}
                style={styles}>
                <TileLayer
                    attribution={stamenTonerAttr}
                    url={stamenTonerTiles}/>
            </Map>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('mapid')
);