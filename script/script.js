/*-----------------------------------*\
$ Define Variables
\*-----------------------------------*/

// Define HTML element variable
let yesButton = document.querySelector('#yes')
let noButton = document.querySelector('#no')
let question = document.getElementById('question');

// Flowchart elements y = yes, n = no
let root_ans = document.getElementById('question');

// root node
let first_question = "Do you believe a violation of the ASUCSD Constitution or bylaws has occurred?";

// level 1 of tree
let y_ans = "Does the alleged violation pertain to ASUCSD elections?"
let n_ans = "Are you seeking interpretation or clarification regarding the ASUCSD Constitution or by-laws?"

// level 2 of tree
let yy_ans = "Have you filed a grievance with the ASUCSD Elections Committee and received a response?"
let yn_ans = "Have you submitted the grievance form located on the Judicial Board page at as.ucsd.edu?"
let ny_ans = "Please email the Judicial Board Chair at asjudicialchair@ucsd.edu with your question(s)."
let nn_ans = "If you would like further assistance, please contact the Advocate General at asgreneral@ucsd.edu"

// level 3 of tree
let yyy_ans = "Would you like to appeal this response to the Judicial Board?"
let yyn_ans = "Please fill out the grievance form located on the Elections page at as.ucsd.edu"
let yny_ans = "Has the hearing been conducted regarding your grievance?"
let ynn_ans = "Please submit this form so that your grievance may be considered by the Judicial Board."

// level 4 of tree
let yyyy_ans = "Please fill out the appeal form located on the Judicial Board page at as.ucsd.edu"
let yyyn_ans = "Thank you for visiting the Judicial Board page! Please contact Christian Walker at cw@ucsd.edu or the Judicial Board Chair at asjudicialchair@ucsd.edu for any further questions"
let ynyy_ans = "If you would like to appeal the Judicial Boardʼs decision, please fill out the appeal form located on the Judicial Board page at as.ucsd.edu"
let ynyn_ans = "The Judicial Board will reach out to you shortly regarding next steps. Thanks for your patience."

/*-----------------------------------*\
$ Define binary tree structure using Node class
\*-----------------------------------*/
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null
        this.parent = null;
        this.isOrange = false;
    }

    get left() {
        return this._left;
    }

    set left(left_node) {
        this._left = left_node;
        if (left_node) {
            left_node.parent = this;
        }
    }

    get right() {
        return this._right;
    }

    set right(right_node) {
        this._right = right_node;
        if (right_node) {
            right_node.parent = this;
        }
    }
}

/*-----------------------------------*\
$ Building tree data structure
\*-----------------------------------*/

// Root node
let root_node = new Node(first_question);
let current_node = root_node;

// level 1 of tree
current_node.left = new Node(y_ans);
current_node.right = new Node(n_ans);

// level 2 of tree
current_node = root_node.left; // expand on the left subtree
current_node.left = new Node(yy_ans);
current_node.right = new Node(yn_ans);
current_node = current_node.parent.right; // expand on the right subtree
current_node.left = new Node(ny_ans);
current_node.left.isOrange = true; // special node with orange color
current_node.right = new Node(nn_ans);

// level 3 of tree
current_node = root_node.left.left; // expand on answers that begins with two 'yes'
current_node.left = new Node(yyy_ans);
current_node.right = new Node(yyn_ans);
current_node = current_node.parent.right; // expand on answers that begins with 'yes' then 'no'
current_node.left = new Node(yny_ans);
current_node.right = new Node(ynn_ans);

// level 4 of tree
current_node = root_node.left.left.left;
current_node.left = new Node(yyyy_ans);
current_node.left.isOrange = true; // special node with orange color
current_node.right = new Node(yyyn_ans);
current_node = root_node.left.right.left;
current_node.left = new Node(ynyy_ans);
current_node.left.isOrange = true; // special node with orange color
current_node.right = new Node(ynyn_ans);

// set current node back to root node
current_node = root_node;

/*-----------------------------------*\
$ Start of quiz
\*-----------------------------------*/

function navigateQuestion(yes_clicked) {
    if (yes_clicked) {
        question.innerHTML = current_node.left.value;
        current_node = current_node.left;
    } 
    else {
        question.innerHTML = current_node.right.value;
        current_node = current_node.right;
    }
    if (!current_node.left && !current_node.right) {
        yesButton.style.display = "none";
        noButton.style.display = "none";
        if (current_node.isOrange) {
            question.style.backgroundColor = '#FC8900';
        }
        else {
            question.style.backgroundColor = '#182B49';
            question.style.borderColor = '#00629B';
        }
    }
}

yesButton.addEventListener('click', function() {
    navigateQuestion(1);
});
noButton.addEventListener('click', function() {
    navigateQuestion(0);
});