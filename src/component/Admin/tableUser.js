import Table from "react-bootstrap/Table";

const TableUser = (props) => {
  const { listUser, setIsShowModalUpdateUser } = props;
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th> Username</th>
            <th>Email</th>
            <th>Role:</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`index-user ${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-secondary">View</button>
                    <button
                      onClick={() => {
                        props.handleSubmitBtnUpdateUser(item);
                      }}
                      className="btn btn-warning mx-3"
                    >
                      Update
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUser.length === 0 && (
            <tr>
              <td colSpan={4}>Not have user</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};
export default TableUser;
