import React from 'react'

function PageButton() {
    return (
        <div class="ui grid">
            <div class="four column row">
                <div class="left floated column">
                <button className="ui left labeled icon inverted secondary button">
                        <i className="left arrow icon"></i>
                        Back
                    </button>
                </div>
                <div class="right floated column">
                <button className="ui right labeled icon inverted secondary button">
                        <i className="right arrow icon"></i>
                        Next
                    </button>
                </div>
            </div>


        </div>
    )
}

export default PageButton
