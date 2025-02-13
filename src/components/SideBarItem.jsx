const SideBarItem = ({ menu }) => {
    return (
        <div className="sidebar-item">
            <p>{menu.name}</p>
        </div>
    );
};

export default SideBarItem;
