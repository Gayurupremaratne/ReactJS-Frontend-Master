import React, { Component } from "react";

export class Contactus extends Component {
  render() {
    const contain = {
      marginTop: 45,
      padding: 15,
      flexDirection: "row",
      borderRadius: 12
    };

    const cols={
      borderRadius: 12
    }

    return (
      <div>
        
        <div className="container" style={contain}>
          <div className="row">
            <div className="col-7"  style={cols}>
              <div class="card mb-0">
                <div className="card-header" style={{backgroundColor:'#63c2de'}}>
                  <h2>Drop us a line</h2>
                </div>
                <div class="card-body">
                  <form action="" method="post">
                    <div class="form-group">
                      <label for="nf-email">Full name</label>
                      <input
                        class="form-control"
                        id="nf-email"
                        type="email"
                        name="nf-email"
                        placeholder="Enter full name.."
                        autocomplete="email"
                      />
                    </div>
                    <div class="form-group">
                      <label for="nf-email">Email</label>
                      <input
                        class="form-control"
                        id="nf-email"
                        type="email"
                        name="nf-email"
                        placeholder="Enter email.."
                        autocomplete="email"
                      />
                    </div>
                    <label for="nf-email">Message</label>
                    <textarea
                      class="form-control"
                      id="textarea-input"
                      name="textarea-input"
                      rows="9"
                      placeholder="Content.."
                    />
                    <div style={{ marginTop: 15 }}>
                      <div style={{ display: "inline-block" }}>
                        <button class="btn btn-sm btn-primary" type="submit">
                          <i class="fa fa-dot-circle-o"></i> Submit
                        </button>
                      </div>
                      <div style={{ display: "inline-block", marginLeft: 10 }}>
                        <button class="btn btn-sm btn-danger" type="reset">
                          <i class="fa fa-ban"></i> Reset
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-5">
              <img 
                src="https://jetblue.airlines-phonenumber.com/wp-content/uploads/2018/11/Contact-Us-PNG.png"
                class="img-fluid"
                alt="Responsive image"
                style={{ height: 543 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contactus;
