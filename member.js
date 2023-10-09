function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/skills/member.html',
        controller: 'SkillsMemberController',
        controllerAs: 'skillsMemberCtrl',
        bindToController: true,
        scope: {
            member: '='
        }
    };
}