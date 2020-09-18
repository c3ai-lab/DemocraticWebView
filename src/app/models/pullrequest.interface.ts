export class PullRequest {
    constructor(public id: number,
        public pullRequestId: string,
        public title: string,
        public hostingplatform: string,
        public pullRequestLink: string,
        public description: string,
        public isTransferd: string,
        public voteEnd: number,
        public votersApproveCount: string,
        public votersDenyCount: string) { }
}