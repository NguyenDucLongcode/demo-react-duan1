import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

const TableUser = (props) => {
  const { listUser, pageCount, currentPage, setCurrentPage } = props;
  const handlePageClick = (event) => {
    props.fetchListUserWithPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected}`);
  };
  return (
    <>
      <div className="table-user">
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
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          props.handleBtnViewUser(item);
                        }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          props.handleSubmitBtnUpdateUser(item);
                        }}
                        className="btn btn-warning mx-3"
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          props.handleBtnDeleteUser(item);
                        }}
                      >
                        Delete
                      </button>
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
      </div>
      <div className="user-pagination d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Pre"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};
export default TableUser;
