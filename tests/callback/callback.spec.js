// check only callback pattern
describe('Conference.attendeeCollection', function () {
  describe('iterate(callback)', function () {
    var collection,
        callbackSpy;
    
    // helper functions to test
    function addAttendeesToCollection (attendeeArray) {
      attendeeArray.forEach(function (attendee) {
        collection.add(attendee);
      })
    }

    function verifyCallbackWasExcutedForEachAttendee (attendeeArray) {
      expect(callbackSpy.calls.count()).toEqual(attendeeArray.length);

      //check every call first parameter is attendeeArray's element
      var allCalls = callbackSpy.calls.all();
      for (var i=0; i<allCalls.length; i++) {
        expect(allCalls[i].args[0]).toBe(attendeeArray[i]);
      }
    }

    beforeEach(function () {
      collection = Conference.attendeeCollection();
      callbackSpy = jasmine.createSpy();
    });

    it('do not call callback when collection is empty', function () {
      collection.iterate(callbackSpy);
      expect(callbackSpy).not.toHaveBeenCalled();
    });

    it('When collection have only one element, callback is called once', function () {
      var attendees = [
        Conference.attendee('TK-one', 'Kim')
      ];

      addAttendeesToCollection(attendees);

      collection.iterate(callbackSpy);

      verifyCallbackWasExcutedForEachAttendee(attendees);
    });

    it('callback is called iterate collection length', function () {
      var attendees = [
        Conference.attendee('TK-one', 'Kim'),
        Conference.attendee('Sharon', 'Res'),
        Conference.attendee('Loekki', 'Casper')
      ];

      addAttendeesToCollection(attendees);

      collection.iterate(callbackSpy);

      verifyCallbackWasExcutedForEachAttendee(attendees);
    });
  });
});

describe('Conference.checkInService', function () {
  var checkInService,
      checkInRecorder,
      attendee;

  beforeEach(function () {
    checkInRecorder = Conference.checkInRecorder();
    spyOn(checkInRecorder, 'recordCheckIn');
  
    checkInService = Conference.checkInService(checkInRecorder);

    attendee = Conference.attendee('TK-one', 'Kim');
  });

  describe('checkInService.checkIn(attendee)', function () {
    it('make attendee checkin true', function () {
      checkInService.checkIn(attendee);
      expect(attendee.isChecked()).toBe(true);
    });

    it('register checkin', function () {
      checkInService.checkIn(attendee);
      expect(checkInRecorder.recordCheckIn).toHaveBeenCalledWith(attendee);
    });
  })
});