

function Form(){
    return(
        <form id="survey-form" action="#" method="#"> 
  <label  id="name-label">Name: <input id="name" type="text" placeholder="Please enter your name" required />
  </label>
  <label  id="email-label">Email: <input id="email" type="email" placeholder="Please enter your email"  required />
  </label>
  <label  id="number-label">Phone: <input id="number" type="number" max="10" min="8" placeholder="Please enter your phone number" required />
  </label>
   <select name="dropdown" id="dropdown">
                <option value="1">Very Satisfied</option>
                <option value="2">Satisfied</option>
                <option value="3">Neutral</option>
                <option value="4">Unsatisfied</option>
                <option value="5">Very Unsatisfied</option>
            </select>
            <label >
                Would you recommend us to a friend?
                <input type="radio" name="recommend" value="yes"
                    id="radio1" />Yes
                <input type="radio" name="recommend" value="no" id="radio2" checked />No
            </label>
            <label>
                What did you like the most?
                <input type="checkbox" name="like" value="service" />Service
                <input type="checkbox" name="like" value="price" />Price
                <input type="checkbox" name="like" value="quality" />Quality
                <input type="checkbox" name="like" value="other" />Other
            </label>
            <label>
                What should we improve?
                <textarea name="improve" id="improve">
                </textarea>
            </label>
            <button type="submit" id="submit">Submit</button>
</form>
    );
}


export default Form