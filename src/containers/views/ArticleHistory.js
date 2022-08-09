import React, { Component } from "react";

export class ArticleHistory extends Component {
  render() {

    const cols ={
        marginTop:75
    };

    return (
      <div class="container">
        <div class="row">
          <div class="col" style={cols}>
            <div class="card">
              <div class="card-header">
                <i class="fa fa-history"></i> Article History
              </div>
              <div class="card-body">
                <table class="table table-responsive-sm table-striped">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Content</th>
                      <th>Publisher</th>
                      <th>Submitted date</th>
                      <th>Published date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                 
                      <td>Yiorgos Avraamu</td>
                      <td>Content</td>
                      <td>Member</td>
                      <td>2012/01/01</td>
                      <td>2012/02/01</td>
                      <td>
                        <span class="badge badge-success">Approved</span>
                      </td>
                    </tr>
                    <tr>
                  
                      <td>Avram Tarasios</td>
                      <td>Content</td>
                      <td>Staff</td>
                      <td>2012/02/01</td>
                      <td>2012/02/01</td>
                      <td>
                        <span class="badge badge-danger">Rejected</span>
                      </td>
                    </tr>
                    <tr>
                  
                      <td>Quintin Ed</td>
                      <td>Content</td>
                      <td>Admin</td>
                      <td>2012/02/01</td>
                      <td>2012/02/01</td>
                    
                      <td>
                        <span class="badge badge-danger">Rejected</span>
                      </td>
                    </tr>
                    <tr>
                   
                      <td>Enéas Kwadwo</td>
                      <td>Content</td>
                      <td>Member</td>
                      <td>2012/03/01</td>
                      <td>2012/02/01</td>
                      <td>
                        <span class="badge badge-warning">Pending</span>
                      </td>
                    </tr>
                    <tr>
                  
                      <td>Agapetus Tadeáš</td>
                      <td>Content</td>
                      <td>Staff</td>
                      <td>2012/02/01</td>
                      <td>2012/01/21</td>
                      <td>
                        <span class="badge badge-success">Active</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#">
                      Prev
                    </a>
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      4
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleHistory;
