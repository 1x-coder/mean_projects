import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { BookReservation } from '../model/bookReservation';
import { Loan } from '../model/loan';
import { Notifications } from '../model/notifications';
import { Review } from '../model/review';
import { SysVariable } from '../model/sys';
import { User } from '../model/user';
import { BookReservationService } from '../services/book-reservation.service';

import { BookServiceService } from '../services/book-service.service';
import { LoanServiceService } from '../services/loan-service.service';
import { NotificationService } from '../services/notification.service';
import { RequestsServiceService } from '../services/requests-service.service';
import { ReviewsService } from '../services/reviews.service';
import { SysVariableServiceService } from '../services/sys-variable-service.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {

  constructor(private userService: UserServiceService, private requestService: RequestsServiceService,
    private mainRouter: Router, private bookService: BookServiceService, private loanService: LoanServiceService, private sysVariableService: SysVariableServiceService, private domSanitizer: DomSanitizer, private reviewService: ReviewsService, private bookReservationService: BookReservationService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    
    this.canTake();

    this.infoWriter = "";
    
    this.activeBook.writer.forEach(element => {
      let pom = element + ",";
      this.infoWriter += pom;
    });
    this.infoWriter = this.infoWriter.slice(0, -1)


    this.infoGenre = ""
    this.activeBook.genre.forEach(element => {
      let pom = element + ",";
      this.infoGenre += pom;
    });
    this.infoGenre = this.infoGenre.slice(0, -1)

    this.reviewService.getAll(this.activeBook.idBook).subscribe((data: Review[]) => {
      this.allReviews = data;
      this.sortByDateDesc();

      let count = 0;
      this.allReviews.forEach(element => {
        if(element.username == this.readerUser.username) count++;
      });
      if(count >= 1){
        this.canComment = false;
      }
      else{

        this.loanService.getAllBookAndUsername(this.readerUser.username, this.activeBook.idBook).subscribe((res: Loan[]) => {
          if(res.length > 0){
            this.canComment = true;
          }
          else{
            this.canComment = false;
          }
        })
      }
    })


  }

  activeBook: Book = JSON.parse(localStorage.getItem('bookInUse'));
  readerUser: User = JSON.parse(localStorage.getItem('loggedUser'));
  allLoans: Loan[];

  userCan: boolean = false;
  reservationCan: boolean = false;
  errorMsg: string;



  canTake(){
    
      this.loanService.checkIfUserTookBook(this.readerUser.username, this.activeBook.idBook).subscribe((data)=>{
        if(this.activeBook.amount == 0){
          this.errorMsg="Nema slobodnih knjiga";
          if(data){
          }
          else{
            this.reservationCan = true;
          }
        }
        else{
          if(data){
            this.errorMsg="Korisnik vec poseduje knjigu";
            
          }
          else{
            this.userCan = true;
          }
      }
    })
  }


  success: boolean = true;
  takingErrorMessage: string;
  successMessage: string;
  
  
  
  
  take(){
    this.userCan = false;
    //proveriti da li vec ima 3 knjige ili neku kojoj je prosao rok zaduzenja

    
    this.loanService.getAll(this.readerUser.username, false).subscribe((data: Loan[])=>{
      this.allLoans = data;

      if(this.allLoans.length >= 3){
        this.takingErrorMessage = "Greska, korisnik vec poseduje 3 zaduzene knjige!";
        this.success = false;
      }


      this.allLoans.forEach(element => {
        let helper = new Date(element.deadLine);
        let today = new Date();
        if(element.idBook == this.activeBook.idBook){
          this.success = false;
          this.userCan = false
        }

        if(helper < today){
          this.takingErrorMessage = "Nije moguce izvrsiti! Korisnik poseduje knjigu koju nije vratio a prosao je rok za vracanje!";
          this.success = false;
          this.userCan = false
        }
      })
      



      if(this.success){
        //azurira knjizi amount -1
        //azurira knjizi timesTaken +1
        //napravi novi loan (dodaje mu specifican sledeci id po redu)
        //azurira korisniku numOfBooks +1

        this.bookService.updateAmount(this.activeBook.idBook, -1).subscribe(respObj=>{
          if(respObj['message'] == "ok"){
            
            this.bookService.updateTimesTaken(this.activeBook.idBook, 1).subscribe(respObj2=>{
              if(respObj2['message'] == "ok"){

                this.activeBook.timesTaken +=1;
                this.activeBook.amount -=1;
                if(this.activeBook.amount == 0) this.userCan = false;


                let period: number;
                this.sysVariableService.getExtendPeriod().subscribe((helper: SysVariable)=>{
                  period = helper.extendPeriod;
                  let todayIs:Date = new Date();
                  let todayTimestamp = todayIs.getTime();
                  todayTimestamp += 2*60*60*1000;
                  let millis = todayTimestamp;
                  millis += period*24*60*60*1000;
                  let todayDate = new Date(todayTimestamp);
                  let deadLineIs = new Date(millis);

                  let loansToGetId: Loan[];
                  
                  
                  
                  
                  this.loanService.getAllFromAllUsers().subscribe((backObj:Loan[])=>{
                      loansToGetId = backObj;
                      
                      loansToGetId = loansToGetId.sort((loan1,loan2)=>{
                        if(loan1.idLoan > loan2.idLoan){
                          return -1;
                        }
                        else{
                          if(loan1.idLoan == loan2.idLoan){
                            return 0;
                    
                          }
                          else{
                            return 1;
                          }
                        }
                      });
                      let nextIdLoans;
                      if(loansToGetId == null || loansToGetId.length == 0){
                        nextIdLoans = 1;
                       }else{
                        nextIdLoans = loansToGetId[0].idLoan + 1;
                       }
                  
                      



                      this.loanService.insertLoan(nextIdLoans, this.activeBook.idBook, this.activeBook.title, deadLineIs, this.readerUser.username, this.activeBook.writer, todayDate, this.activeBook.picture).subscribe(backObj=>{
                        if(backObj['message'] == "ok"){
                          

                          //poveca useru broj knjiga*/
                          
                          this.userService.incNumBook(this.readerUser.username, 1).subscribe(res=>{
                                if(res['message'] == "ok"){
                                  this.successMessage = "Uspesno ste zajmili knjigu";
                                  
                                  //sesija
                                  localStorage.setItem('bookInUse', JSON.stringify(this.activeBook));
                                  this.readerUser.numOfTakenBooks += 1;
                                  localStorage.setItem('loggedUser', JSON.stringify(this.readerUser));
                                 
                                  this.success = false;
                                  window.location.reload();
                                  
                                }
                    })




                        }
                    })



                  })

                            
                 


                  })

              }
              
            })
          }
       })
      }


    })
  }



  //-------------------------------UREDIVANJE---------------------
  editingMode: boolean = false;
  infoTitle: string = this.activeBook.title;



  infoWriter: string;

  infoGenre: string;
  infoPublisher: string = this.activeBook.publisher;
  infoPubYear: number = this.activeBook.pubYear;
  infoLanguage: string = this.activeBook.language;
  infoAmount: number = this.activeBook.amount;
  infoPicture: string = this.activeBook.picture;



  switch(){
    this.editingMode = true;
  }

  switch2(){
    this.editingMode = false;
  }


  
  picture: string
  pictureAddingMessage: string
  isSaved: boolean

  addPicture(fileInput: any) {
    this.pictureAddingMessage = null;
    this.picture = null
    this.isSaved = false
    if (fileInput.target.files && fileInput.target.files[0]) {

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];



          
            const imgBase64Path = e.target.result;
            this.picture = imgBase64Path;
            this.isSaved = true;
            return true
            // this.previewImagePath = imgBase64Path;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  picturePath() {
    return this.domSanitizer.bypassSecurityTrustUrl(this.picture)
  }

  updateBook(){
    if(this.picture == null) this.picture = this.activeBook.picture;
    
    let arrayOfWriters: string[] = (this.infoWriter).split(",").map((item: string) => item.trim())
    let arrayOfGenres: string[] = (this.infoGenre).split(",").map((item: string) => item.trim())

    this.bookService.updateBook(this.activeBook.idBook, this.infoTitle, arrayOfWriters, arrayOfGenres, this.infoPublisher, this.infoPubYear, this.infoLanguage, this.picture, this.infoAmount).subscribe(backObj=>{
      if(backObj['message'] == "ok"){

      this.activeBook.title = this.infoTitle;
      this.activeBook.writer = arrayOfWriters;
      this.activeBook.genre = arrayOfGenres;
      this.activeBook.publisher = this.infoPublisher;
      this.activeBook.pubYear = this.infoPubYear;
      this.activeBook.language = this.infoLanguage;
      this.activeBook.picture = this.picture;
      this.activeBook.amount = this.infoAmount;




      localStorage.setItem('bookInUse', JSON.stringify(this.activeBook));
      this.picture = null;



        if(this.infoAmount > 0){

          let howMuchTime:number = this.infoAmount;

          

            //rezervacije
            let reservationsFromThisBook: BookReservation[];
            this.bookReservationService.getAllForOneBook(this.activeBook.idBook).subscribe((res: BookReservation[])=>{
              reservationsFromThisBook = res;
              if(reservationsFromThisBook.length!=0){


                reservationsFromThisBook = reservationsFromThisBook.sort((req1,req2)=>{
                  if(req1.idBookReservation < req2.idBookReservation){
                    return -1;
                  }
                  else{
                    if(req1.idBookReservation == req2.idBookReservation){
                      return 0;
            
                    }
                    else{
                      return 1;
                    }
                  }
                })

                for(let i = 0; i < reservationsFromThisBook.length; i++){
                  

                  if(howMuchTime > 0){

                    let usernameToGet = reservationsFromThisBook[i].username;

                   this.loanService.getAll(usernameToGet, false).subscribe((data: Loan[])=>{
                   let usersLoans = data;
                   let success = true;
              
                    if(usersLoans.length >= 3){
                      success = false; //ima 3 ili vise zaduzenja
                    }
              
              
                    usersLoans.forEach(element => {
                      let helper = new Date(element.deadLine);
                      let today = new Date();
                      if(element.idBook == reservationsFromThisBook[i].idBook){
                        success = false;
                      }
              
                      if(helper < today){
                       success = false; //ima neki kome je prosao rok
                      }
                    })

                    if(success){
                      //da njemu knjigu i prekine sa ovim i obrise zahtev
                      this.loanService.getAllFromAllUsers().subscribe((backObj:Loan[])=>{
                        let loansToGetId = backObj;
                        
                        loansToGetId = loansToGetId.sort((loan1,loan2)=>{
                          if(loan1.idLoan > loan2.idLoan){
                            return -1;
                          }
                          else{
                            if(loan1.idLoan == loan2.idLoan){
                              return 0;
                      
                            }
                            else{
                              return 1;
                            }
                          }
                        });
                    
                        let nextIdLoans: number;
                        if(loansToGetId == null || loansToGetId.length == 0){
                          nextIdLoans = 1;
                         }else{
                          nextIdLoans = loansToGetId[0].idLoan + 1;
                         }
  
                         this.bookService.getBookById(reservationsFromThisBook[i].idBook).subscribe((book1:Book)=>{
                         let retBook = book1;


                          let period: number;
                          this.sysVariableService.getExtendPeriod().subscribe((helper: SysVariable)=>{
                           period = helper.extendPeriod;
                           let todayIs:Date = new Date();
                           let todayTimestamp = todayIs.getTime();
                           todayTimestamp += 2*60*60*1000;
                           let millis = todayTimestamp;
                           millis += period*24*60*60*1000;
                           let todayDate = new Date(todayTimestamp);
                           let deadLineIs = new Date(millis);



                           this.loanService.insertLoan(nextIdLoans + i, reservationsFromThisBook[i].idBook, retBook.title, deadLineIs, reservationsFromThisBook[i].username, retBook.writer, todayDate, retBook.picture).subscribe(res6=>{
                            if(res6['message'] == "ok"){
                              
    
                              //poveca useru broj knjiga*/
                              
                              this.userService.incNumBook(reservationsFromThisBook[i].username, 1).subscribe(res11=>{
                                    if(res11['message'] == "ok"){

                                      


                                      this.bookService.updateAmount(reservationsFromThisBook[i].idBook, -1).subscribe((res)=>{
                                        if(res['message'] == "ok"){
                                           //rezervacija je bila uspesna
                                           
                                             //doda obavestenje za trajno dodatu knjigu
                                             this.notificationService.getAll().subscribe((resp4:Notifications[])=>{
                                              let allNotif:Notifications[] = resp4;
                                      
                                              allNotif = allNotif.sort((notif1,notif2)=>{
                                              if(notif1.idNotification > notif2.idNotification){
                                                return -1;
                                              }
                                              else{
                                                if(notif1.idNotification == notif2.idNotification){
                                                  return 0;
                                          
                                                }
                                                else{
                                                  return 1;
                                                }
                                              }
                                            });
                                        
                                            let nextIdNotif;
                                            if(allNotif == null || allNotif.length == 0){
                                              nextIdNotif = 1;
                                              }else{
                                              nextIdNotif = allNotif[0].idNotification + 1;
                                              }
                                      
                                            this.notificationService.insertNotification(nextIdNotif, reservationsFromThisBook[i].username, "Rezervacija za knjigu " + retBook.title+" je uspesna", false).subscribe((resp4:Notifications[])=>{
                                                  if(resp4['message'] == "ok"){
                                                   
                                                    this.bookReservationService.deleteReservation(reservationsFromThisBook[i].idBookReservation).subscribe((res15)=>{
                                                      if(res15['message'] == "ok"){
                                                        
                                                        howMuchTime--;
                                                        this.activeBook.amount -= 1;
                                                        localStorage.setItem('bookInUse', JSON.stringify(this.activeBook));
              
                                                      }
                                                    })
                                                  }
                                                  })
                                            })

                                           












                                          





                                        }
                                      })
                                      
                                    }
                        })
    
    
    
    
                            }
                        })






                         })


                          





                        
                        })
                         
  
                        
  
  
  
                    })
                    }


                  })



                  }
                  


                }


              }


             



              
            
            
            })













        }





      }
  })
}

//---------------------------------------OBRISI KNJIGU-------------------------------


errorBookIsTaken: string;

deleteBook(){

  this.errorBookIsTaken = null;

  this.loanService.getAllForOneBook(this.activeBook.idBook, false).subscribe((data: Loan[]) => {
    if(data.length != 0){
      this.errorBookIsTaken = "Nije moguce izbrisati knjigu, jer je zaduzena trenutno";
    }
    else{
      this.bookService.deleteBook(this.activeBook.idBook).subscribe(resp=>{
        if(resp['message'] == "ok"){
          this.returnToMainPage();
        }
      })
    }
  })
}

returnToMainPage(){
  if(this.readerUser.type == "moderator"){
    this.mainRouter.navigate(['moderator']);
  }else if(this.readerUser.type == "citalac"){
    this.mainRouter.navigate(['citalac']);
  }
  else{
    this.mainRouter.navigate(['admin']);
  }
}


//----------------------------------------------------KOMENTARI---------------------------------

allReviews: Review[];

parseDate(p){
  let commentDate = new Date(p.date);
  return "" + commentDate.getFullYear() + "-" + (commentDate.getMonth()+1) + "-" + commentDate.getDate() + "  " + commentDate.getHours() + ":" + commentDate.getMinutes();
}


sortByDateDesc(){
  this.allReviews = this.allReviews.sort((review1,review2)=>{
    if(review1.date > review2.date){
      return -1;
    }
    else{
      if(review1.date == review2.date){
        return 0;

      }
      else{
        return 1;
      }
    }
  });
}



commentTextToInsert: string;
ratingToInsert: number = 0;
canComment:boolean;
canEdit: boolean = false;
addComment(){

  let allReviewsFromMultipleUsers: Review[];
  this.reviewService.getAllFromAllUsers().subscribe((backObj:Review[])=>{
    allReviewsFromMultipleUsers = backObj;

    allReviewsFromMultipleUsers = allReviewsFromMultipleUsers.sort((review1,review2)=>{
      if(review1.idReview > review2.idReview){
        return -1;
      }
      else{
        if(review1.idReview == review2.idReview){
          return 0;
  
        }
        else{
          return 1;
        }
      }
    });
    let nextIdReview;
    if(allReviewsFromMultipleUsers == null || allReviewsFromMultipleUsers.length == 0){
      nextIdReview = 1;
     }else{
      nextIdReview = allReviewsFromMultipleUsers[0].idReview + 1;
     }



    this.reviewService.insertReview(nextIdReview, this.readerUser.username, this.ratingToInsert, this.activeBook.idBook, this.commentTextToInsert, new Date(), false).subscribe(backObj=>{
      if(backObj['message'] == "ok"){

        this.calculateRating();


        
      }
    })
  })
}


//moze i da ne dohvatam opet
calculateRating(){
  let allRev: Review[];
  this.reviewService.getAll(this.activeBook.idBook).subscribe((data: Review[]) => {
    allRev = data;
    let sum = 0;
    allRev.forEach(element => {
      sum += element.rating;
    });
    let newRating = sum / allRev.length;

    this.bookService.updateRating(this.activeBook.idBook, newRating).subscribe(backObj=>{
      if(backObj['message'] == "ok"){
        this.activeBook.averageRating = newRating;
        localStorage.setItem('bookInUse', JSON.stringify(this.activeBook));
        window.location.reload();
      }
    })


  })
}




//---------------------------------AZURIRANJE KOMENTARA----------------------------------------------


toggleCanEdit(){
  if(this.canEdit==false) this.canEdit = true;
  else this.canEdit = false;
}


updateCommentTextToInsert: string;
updateRatingToInsert: number = 0;



updateComment(p:Review){
    this.reviewService.updateReview(p.idReview, this.updateRatingToInsert, this.updateCommentTextToInsert, new Date(), true).subscribe(backObj=>{
      if(backObj['message'] == "ok"){
        this.calculateRating();
      }
    })
}






//--------------------------------------REZERVACIJA---------------------------------

  reservationMessage: string = "";

  reserve(){

    let allReservations: BookReservation[];
  this.bookReservationService.getAll().subscribe((backObj:BookReservation[])=>{
    allReservations = backObj;

    allReservations = allReservations.sort((reservation1,reservation2)=>{
      if(reservation1.idBookReservation > reservation2.idBookReservation){
        return -1;
      }
      else{
        if(reservation1.idBookReservation == reservation2.idBookReservation){
          return 0;
  
        }
        else{
          return 1;
        }
      }
    });
    let nextIdReservation;
    if(allReservations == null || allReservations.length == 0){
      nextIdReservation = 1;
     }else{
      nextIdReservation = allReservations[0].idBookReservation + 1;
     }


     this.bookReservationService.insertReservation(this.readerUser.username, nextIdReservation, this.activeBook.idBook).subscribe(res=>{
      if(res['message'] == "ok"){
        this.reservationMessage = "rezervacija uspesna!";
      }
    })



    })

    

  }





}




