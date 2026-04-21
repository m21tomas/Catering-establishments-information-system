import { useState } from 'react';
import defaultImage from "../../images/defaultImg.jpg";
import EditImage from './EditImage';
import PropTypes from 'prop-types';

const CanteenViewByAdminForUser = ({ canteenFullData, editCanteenData, setEditCanteenData, getCanteenEntity }) => {
    
    const [chosen, setChosen] = useState ({
        disk: false,
        linkUrl: false
    })
    const [editDiskImagePreview, setEditDiskImagePreview] = useState(null);
    const [editUrlLinkValid, setEditUrlLinkValid] = useState(false);

    return (
        <div className="col-sm-3 col-md-6 col-lg-3" style={{ backgroundColor: "#eeeeee", textAlign: "center" }}>
            <h4>Maitinimo įstaigos atvaizdavimas klientui:</h4>
            <br />
            
                <div key={canteenFullData.id} className='card' style={{ width: '100%', border: "2px solid black" }}>
                    <img src={
                        chosen.disk && editDiskImagePreview !== null ? editDiskImagePreview :
                        chosen.linkUrl && editUrlLinkValid ? editCanteenData.editImage :
                        canteenFullData.image !== null ? `data:image/*;base64,${canteenFullData.image}`
                        : defaultImage} 
                        className="card-img-top" 
                        alt="Failed To Load">
                    </img>
                    <div className="card-body">
                        <h5 className="card-title">{canteenFullData.name}</h5>
                        <p className="card-text">{canteenFullData.address}</p>
                        <p className="card-text">{canteenFullData.menuName}</p>
                    </div>
                </div>
                <EditImage
                    editCanteenData={editCanteenData}
                    setEditCanteenData={setEditCanteenData}
                    chosen={chosen}
                    setChosen={setChosen}
                    editDiskImagePreview={editDiskImagePreview}
                    setEditDiskImagePreview={setEditDiskImagePreview}
                    editUrlLinkValid={editUrlLinkValid}
                    setEditUrlLinkValid={setEditUrlLinkValid}
                    getCanteenEntity={getCanteenEntity}
                    canteenId={canteenFullData.id}
                />
        </div>
    )
}

CanteenViewByAdminForUser.propTypes = {
    canteenFullData: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        address: PropTypes.string,
        image: PropTypes.string,
        menus: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                dishes: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number,
                        name: PropTypes.string,
                        description: PropTypes.string,
                    })
                ).isRequired,
            })
        ).isRequired,
        menuName: PropTypes.string
    }),
    editCanteenData: PropTypes.shape({
        editId: PropTypes.string,
        editName: PropTypes.string,
        editAddress: PropTypes.string,
        editImage: PropTypes.string,
        editFile: PropTypes.oneOfType([
            PropTypes.instanceOf(File),
            PropTypes.string,
            PropTypes.null
        ])
    }).isRequired,
    setEditCanteenData: PropTypes.func.isRequired,
    getCanteenEntity: PropTypes.func.isRequired
}

export default CanteenViewByAdminForUser