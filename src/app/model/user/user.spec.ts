import {UserDTO} from "./userDTO";

describe("Use",()=>{
  it("should create an instance",() =>{
    expect(new UserDTO()).toBeTruthy()
  });
  it("should get the information about the user", () => {
    let user = new UserDTO("12","Ays","Nice",false)
    const exceptedValue = {
      userID: "12",
      vorname: "Ays",
      nachname: "Nice",
      isAdmin: false
    }
    console.log(user.getUser())
    expect(user.getUser()).toEqual(exceptedValue)
  })
});
